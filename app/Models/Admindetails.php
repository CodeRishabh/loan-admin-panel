<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admindetails extends Model
{
    use HasFactory;
    protected $primaryKey = '_id';
    protected $keyType = 'string';
    protected $fillable = [
        'user',
        'password',
        'bankAccountname',
        'bankAccountNumber',
        'bankIFSCCode',
        'emailId',
        'logo',
    ];

}
