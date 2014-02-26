<?php

/**
 * Class Email
 */
class Email
{
    /**
     * @var string
     */
    public $name;
    /**
     * @var string
     */
    public $subject;
    /**
     * @var string
     */
    public $date;

    /**
     * @param $name
     * @param $subject
     * @param $date
     */
    function __construct($name, $subject, $date)
    {
        $this->name = $name;
        $this->subject = $subject;
        $this->date = $date;
    }
}

/**
 * Class Response
 */
class Response
{
    /**
     * @var int
     */
    public $count;
    /**
     * @var int
     */
    public $start;
    /**
     * @var int
     */
    public $limit;
    /**
     * @var array
     */
    public $data;

    /**
     * @param $data
     * @param $start
     * @param $limit
     */
    function __construct($data, $start, $limit)
    {
        $this->data = array_slice($data, $start, $limit);
        $this->start = $start;
        $this->limit = $limit;
        $this->count = count($data);
    }
}

// simula a internet
sleep(1);

$emails = array();
$emails[] = new Email('Dr. Rodrigo', 'Cirurgia do joelho', '2013-06-11 10:49:01');
$emails[] = new Email('Gil brother', 'Feliz ano novo!', '2013-12-31 12:59:59');
$emails[] = new Email('Ivete Sangalo', 'Carnaval em Salvador', '2014-03-01 00:00:01');
$emails[] = new Email('Annelise Gripp', 'Entrevista', '2014-02-25 08:09:10');
$emails[] = new Email('Judith', 'Hoje!', date('Y-m-d H:i:s'));

$response = new Response($emails, $_REQUEST['start'], $_REQUEST['limit']);

echo json_encode($response);