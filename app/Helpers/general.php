<?php

if (!function_exists('generateKode')) {
    function generateKode($prefix = 'SIS')
    {
        return $prefix . '-' . time();
    }
}