<?php

namespace App\Domain\Quote\Enum;

enum VoteType : string
{
    case LIKE = 'like';
    case DISLIKE = 'dislike';
}