<?php

namespace Kregel\NovaNewsCard;

use Laravel\Nova\Card;

class News extends Card
{
    /**
     * The width of the card (1/3, 1/2, or full).
     *
     * @var string
     */
    public $width = '1/3';

    /**
     * @var array
     */
    public $meta = [
        'country' => 'us'
    ];

    /**
     * Get the component name for the element.
     *
     * @return string
     */
    public function component()
    {
        return 'nova-news-card';
    }
}
