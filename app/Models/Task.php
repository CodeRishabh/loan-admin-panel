<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $primaryKey = '_id';
    protected $keyType = 'string';
    protected $guarded = ['_id', 'created_at', 'updated_at'];
}
