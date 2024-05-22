<?php

namespace App\Domain\Quote\Entity;

use App\Domain\Quote\Enum\VoteType;
use App\Domain\Quote\Repository\LikeDislikeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LikeDislikeRepository::class)]
class LikeDislike
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['likeDislike:read', 'likeDislike:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['likeDislike:read', 'likeDislike:write'])]
    private ?string $ipAddress = null;

    #[ORM\ManyToOne(inversedBy: 'likeDislikes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['likeDislike:write'])]
    private ?Quote $quote = null;

    #[ORM\Column(length: 255)]
    #[Groups(['likeDislike:read', 'likeDislike:write'])]
    private ?VoteType $voteType = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIpAddress(): ?string
    {
        return $this->ipAddress;
    }

    public function setIpAddress(string $ipAddress): static
    {
        $this->ipAddress = $ipAddress;

        return $this;
    }

    public function getQuote(): ?Quote
    {
        return $this->quote;
    }

    public function setQuote(?Quote $quote): static
    {
        $this->quote = $quote;

        return $this;
    }

    public function getVoteType(): VoteType
    {
        return $this->voteType;
    }

    public function setVoteType(VoteType $voteType): static
    {
        $this->voteType = $voteType;

        return $this;
    }
}
