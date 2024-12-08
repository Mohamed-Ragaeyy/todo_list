<?php

namespace App\Traits;


trait ResponseData {


    public function responseData($responseData = null,$message=null,bool $isSuccess,int $statusCode=200) {

        $response = [
            'data' =>$responseData ,
            'message'=>$message,
            'isSuccess' => $isSuccess
        ];

        return response($response, $statusCode);
    }
}
