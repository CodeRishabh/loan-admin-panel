<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userdetails extends Model
{
    use HasFactory;
    protected $primaryKey = '_id';
    protected $keyType = 'string';
    protected $guarded = ['_id', 'date'];
    public $timestamps = false;

    public function setStateAttribute($value)
    {
        $this->attributes['state'] = strtolower($value);
    }

    public function getApprovalAttribute($value)
    {
        return $value == 1 ? true : false;
    }
}
