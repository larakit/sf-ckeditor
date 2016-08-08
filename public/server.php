<?php
$contents['id'] = 'contentData';

/*$items = [];
$default = null;
$d = new DateTime('now');
for ($i = 1; $i < 100; $i++) {
    $d->add(date_interval_create_from_date_string('1 month'));
    $items[] = ['Галерея менеджеров ' . $d->format('Y,M'), '[gallery_' . $d->format('Y_m') . ']'];
}*/
//print '<pre>';
//print_r($items);
//exit;
//$default = end($items);
//$default = $default[1];
/*$contents['elements'] = [
    [
        'id' => ['radioGroup'],
        'type' => ['select'],
        'items' => $items,
        'default' => $default
    ]
];*/
$items = [];
for ($i = 0; $i < 10; $i++) {
    $items[] = '<div class="js-ck-html-content ins-wrapper"  data-insert="[slider_' . $i . ']">
    <img class="ins-img" src="http://beerhold.it/200/150">
    <div class="ins-text">Название слайдера ' . $i . '</div>
    </div>';
}
$contents['elements'] = [
    [
        'id' => 'htmlContent',
        'type' => 'html',
        'html' => '<div id="js-ck-html" class="ck-html">' . implode('', $items) . '</div>        ',
    ]
];

echo json_encode($contents);