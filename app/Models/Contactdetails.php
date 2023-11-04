<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contactdetails extends Model
{
    use HasFactory;
    protected $primaryKey = '_id';
    protected $keyType = 'string';
    protected $fillable = [
        'firstName',
        'lastName',
        'phoneNumber',
        'emailID',
        'query',
    ];

}
