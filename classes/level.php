<?php
class level
{
    private $defs;
    private $unique_id;
    private $defs_file;
    private $level;

    public function build($levelnumber)
    {
        if(!ctype_digit($levelnumber)) return false;
        if(!file_exists("levels/".$levelnumber."/data.dat")) return false;
        if(!file_exists("levels/".$levelnumber."/definitions.dat")) return false;
        $this->defs = array();
        $this->unique_id = 0;

        // Get the contents of the file that describes the level build
        $this->level          = file("levels/".$levelnumber."/data.dat",FILE_IGNORE_NEW_LINES);
        // Get the object definitions (i.e. that an 'A' stands for a block of water)
        $this->defs_file      = file("levels/".$levelnumber."/definitions.dat",FILE_IGNORE_NEW_LINES);
        foreach($this->defs_file as $definition)
        {
            // Add a definition to the definitions array (i.e. $defs['A'] = 'waterBlock')
            $this->defs[substr($definition,0,1)] = substr($definition,2);
        }
        $this->level = array_reverse($this->level);

        // Loop through every horizontal line of the level to create it on screen
        foreach($this->level as $row_nr=>$row)
        {
            $row_array = str_split($row);
            foreach($row_array as $col_nr=>$character)
            {
                // A single block
                if(array_key_exists($character,$this->defs))
                {
                    $bottom_pos = $row_nr*30;
                    $left_pos = $col_nr*30;
                    echo "\t\t";
                    echo '<img src="sprites/environment/'.$this->defs[$character].'.png" data-id="'.$this->unique_id.'" data-type="'.$this->defs[$character].'" style="position: absolute; bottom: '.$bottom_pos.'px; left: '.$left_pos.'px">';
                    echo "\n";
                    $this->unique_id++;
                }
            }
        }
    }
}