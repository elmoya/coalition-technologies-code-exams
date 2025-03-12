<?php

use Coalition\Exam\Skill;
use PHPUnit\Framework\TestCase;

class SkillTest extends TestCase
{
    public function testHasFunctionExists(): void
    {
        $skill = new Skill();
        $function = 'has' . $this->generateRandomString(5);
        $this->assertTrue($skill->$function(), 'success');
    }

    public function testHasPropertyExists(): void
    {
        $skill = new Skill();
        $property = $this->generateRandomString(7) . '_CT';

        $this->assertTrue($skill->$property == md5($property), 'success');
    }

    public function testHasAnyPropertyExists(): void
    {
        $skill = new Skill();
        $property = $this->generateRandomString(7);

        $this->assertFalse($skill->$property == md5($property), 'success');
    }

    public function testObjectAsString(): void
    {
        $skill = new Skill();
        $this->assertTrue(strpos($skill, 'CT') !== false, 'success');
    }

    public function testSetSkillLanguage(): void
    {
        $skill = new Skill();
        $skill->language = 'PHP';
        $this->assertTrue($skill->language === 'PHP', 'success');
    }

    public function testInvoke(): void
    {
        $skill = new Skill();
        $this->assertEquals(10, $skill([3, 7]));
    }

    private function generateRandomString($length = 10): string
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
