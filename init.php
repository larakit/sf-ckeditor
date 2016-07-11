<?php
\Larakit\StaticFiles\Manager::package('larakit/sf-ckeditor')
    ->setSourceDir('public')
    ->jsPackage('ckeditor.js')
    ->jsPackage('config.js');
