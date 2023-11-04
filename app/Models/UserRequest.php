<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userRequest extends Model
{
    use HasFactory;
    protected $primaryKey = '_id';
    protected $keyType = 'string';
    protected $guarded = ['_id', 'date'];
    public $timestamps = false;

}
