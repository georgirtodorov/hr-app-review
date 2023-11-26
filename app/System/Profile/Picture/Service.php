<?php
declare(strict_types=1);


namespace App\System\Profile\Picture;


class Service
{
    public function set(int $employeeId, $file): array
    {

        $fileName = sprintf('profile_picture_%s.jpg', $employeeId);
        try {
            if (file_exists(sprintf("%simg/faces/%s", $this->getAssetsPath(), $fileName))) {
                unlink(sprintf("%simg/faces/%s", $this->getAssetsPath(), $fileName));
            }
            $file->move(($this->getAssetsPath() . 'img/faces'), $fileName);
            return ['success' => true];
        } catch (\Exception $e) {
            throw new \Exception(sprintf('Picture not saved: %s', $e->getMessage()));
        }

    }

    private function getAssetsPath()
    {
        if ($_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['HTTP_HOST'] == '127.0.0.1') {
            return resource_path() . '/frontend/angular2/src/assets/';
        }
        return public_path('/assets/angular/assets/');
    }

}
