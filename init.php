<?php
\Larakit\StaticFiles\Manager::package('larakit/sf-ckeditor')
    ->setSourceDir('public')
    ->usePackage('larakit/sf-jquery')
//    ->js('//cdn.ckeditor.com/4.5.10/standard/ckeditor.js')
    ->jsPackage('ckeditor.js')
;
//\Larakit\StaticFiles\Manager::package('larakit/sf-ckeditor')
//    ->setSourceDir('public')
//    ->jsPackage('ckeditor.js')
//    ->jsPackage('config.js')
//    ->jsPackage('laraform-wysiwyg.js');
