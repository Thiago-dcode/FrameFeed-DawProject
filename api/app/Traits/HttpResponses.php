<?php

namespace App\Traits;

/**
 * 
 */
trait HttpResponses
{

    protected function success($data, $msg = null, $code = 200)
    {
        return response()->json([
            'status' => 'Request was succesful.',
            'message' => $msg,
            'data' => $data,

        ], $code);
    }

    protected function error($data, $msg = null, $code)
    {
        return response()->json([
            'status' => 'Error has ocurred.',
            'message' => $msg,
            'data' => $data,

        ], $code);
    }
}
