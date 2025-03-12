<?php

declare(strict_types=1);

namespace Coalition\Exam;

class Skill
{
    private $data = [];

    public function __call($method, $args)
    {
        if (strpos($method, 'has') === 0)
            return true;

        return "not exist";
    }

    public function __get($property)
    {
        if (substr($property, -3) === '_CT')
            return md5($property);

        if (array_key_exists($property, $this->data))
            return $this->data[$property];

        return null;
    }

    public function __set($property, $value)
    {
        $this->data[$property] = $value;
    }

    public function __toString()
    {
        return "Coalition Technologies CT";
    }

    public function __invoke($args)
    {
        return array_sum($args);
    }
}
