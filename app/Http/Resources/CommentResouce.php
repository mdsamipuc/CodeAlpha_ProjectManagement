<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
          'id'=> $this->id,
          'user'=> new UserResource($this->user),
          'content'=> $this->content,
          'created_at'=> (new Carbon($this->created_at))->format('Y-m-d H:i:A'),
        ];
    }
}
