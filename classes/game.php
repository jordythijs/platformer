<?php
namespace classes;

class game
{
    private __construct()
    {
        public  $this->lives,
                $this->muted,
                $this->level,
                $this->coins;

        if(!isset($_COOKIE['lives']))
        {
            setcookie("lives","5",time()+60*60*24*365);
            $this->lives = 5;
        }
        else
            {
                $this->lives = $_COOKIE['lives'];
            }

        if(!isset($_COOKIE['music']))
        {
            setcookie("music","on",time()+60*60*24*365);
            $this->muted = '';
        }
        else
        {
            $this->muted = ' muted="muted"';
            if($_COOKIE['music'] == "on") $this->muted = '';
        }

        if(!isset($_COOKIE['level']))
        {
            setcookie("level","1",time()+60*60*24*365);
            $this->level = 1;
        }
        else
        {
            $this->level = $_COOKIE['level'];
        }

        if(!isset($_COOKIE['coins']))
        {
            setcookie("coins","0",time()+60*60*24*365);
            $this->coins = 0;
        }
        else
        {
            $this->coins = $_COOKIE['coins'];
        }
    }

}