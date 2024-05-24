<?php

namespace App\Domain\Quote\Repository;

use App\Domain\Quote\Entity\LikeDislike;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LikeDislike>
 */
class LikeDislikeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LikeDislike::class);
    }
}
