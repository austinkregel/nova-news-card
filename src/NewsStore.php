<?php

declare(strict_types=1);

namespace Kregel\NovaNewsCard;

use Kregel\DataStore\DataStore;
use Kregel\NovaNewsCard\Contracts\NewsStoreContract;

/**
 * Class NewsStore
 * @package Kregel\NovaNewsCard
 */
class NewsStore extends DataStore implements NewsStoreContract
{
    /**
     * @const string
     */
    public const PACKAGE_TAG = 'kregel.news-cache';
}
