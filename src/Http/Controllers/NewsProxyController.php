<?php

declare(strict_types=1);

namespace Kregel\NovaNewsCard\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Kregel\NovaNewsCard\NewsStore;

/**
 * Class NewsProxyController
 * @package Kregel\NovaNewsCard\Http\Controllers
 */
class NewsProxyController extends Controller
{
    /**
     * @var NewsStore
     */
    protected $dataStore;

    protected const CACHE_API_KEY = 'api_key';
    protected const CACHE_MODEL = 'news';

    protected $newsStore;

    public function __construct()
    {
        $this->newsStore = NewsStore::forModel(static::CACHE_MODEL);
    }

    public function topStories(Request $request, $country = 'us')
    {
        if (!$this->newsStore->exists(static::CACHE_API_KEY)) {
            throw ValidationException::withMessages([
                'news.' . static::CACHE_API_KEY => ['Your news api key has not been set.']
            ]);
        }

        $key = sprintf('news:%s', $country);

        if ($this->newsStore->exists($key)) {
            return $this->newsStore->get($key);
        }

        $this->newsStore->save($key, function () use ($request, $country) {
            try {
                $newsJson = (new Client)
                        ->get('https://newsapi.org/v2/top-headlines?apiKey=' . $this->newsStore->first(static::CACHE_API_KEY) . '&country=' . $country)
                        ->getBody()
                        ->getContents();
            } catch (RequestException $e) {
                logger($e->getMessage(), [
                    'context' => $e->getResponse()->getBody()->getContents()
                ]);
                throw $e;
            }
            $decoded = json_decode($newsJson);

            return $decoded;
        });

        return collect($this->newsStore->first($key));
    }

    public function everything($sortBy = 'publishedAt', Request $request)
    {
        if (!$this->newsStore->exists(static::CACHE_API_KEY)) {
            throw ValidationException::withMessages([
                'news.' . static::CACHE_API_KEY => ['Your news api key has not been set.']
            ]);
        }

        if(!$request->has('q')) {
            throw ValidationException::withMessages([
                'q' => [
                    'You must pass the query string to get information from the api.'
                ]
            ]);
        }

        $query = $request->query('q');

        $key = sprintf('news:%s.%s', $sortBy, str_slug($query));

        if ($this->newsStore->exists($key)) {
            return $this->newsStore->get($key);
        }

        $this->newsStore->save($key, function () use ($request, $query) {
            $request->query();

            $newsJson = (new Client)
                ->get(
                    'https://newsapi.org/v2/everything?q=' . $query
                     . '&sortBy=publishedAt&apiKey='
                     . $this->newsStore->first(static::CACHE_API_KEY)
                     . (empty($request->only([
                        'sources',
                        'domains',
                        'excludeDomains',
                        'from',
                        'to',
                        'language',
                        'sortBy',
                        'pageSize',
                        'page'
                    ])) ? '' :'&'
                    . http_build_query($request->only([
                        'sources',
                        'domains',
                        'excludeDomains',
                        'from',
                        'to',
                        'language',
                        'sortBy',
                        'pageSize',
                        'page'
                    ])))
                )
                ->getBody()
                ->getContents();

            $decoded = json_decode($newsJson);

            return $decoded;
        });

        return collect($this->newsStore->first($key));
    }

    public function saveKey(Request $request)
    {
        if (!$request->has(static::CACHE_API_KEY)) {
            throw ValidationException::withMessages([
                static::CACHE_API_KEY => ['The ' . static::CACHE_API_KEY . ' is a required value.'],
                'all' => $request->all(),
            ]);
        }

        if ($this->newsStore->exists(static::CACHE_API_KEY)) {
            $this->newsStore->destroy(static::CACHE_API_KEY);
        }

        $this->newsStore->save(static::CACHE_API_KEY, function () use ($request) {
            return $request->get(static::CACHE_API_KEY);
        });

        return response()->json([
            'message' => 'Key saved!'
        ]);
    }
}
