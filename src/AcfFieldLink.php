<?php

namespace Emrl;

use acf_field;

class AcfFieldLink extends acf_field
{
    protected $path;

    public function __construct($path)
    {
        $this->path = $path;

        $this->name     = 'link';
        $this->label    = 'Link';
        $this->category = 'relational';

        $this->defaults = [
            'url'    => null,
            'title'  => null,
            'target' => false,
        ];

        $this->l10n = [
            'sameTab' => __('same window/tab', 'acf'),
            'newTab'  => __('new window/tab', 'acf'),
        ];

        parent::__construct();
    }

    public function input_admin_enqueue_scripts()
    {
        $dir = plugin_dir_url($this->path);

        wp_enqueue_script('acf-input-link', "{$dir}js/input.js");
        wp_enqueue_style('acf-input-link', "{$dir}css/input.css");
    }

    public function render_field($field)
    {
        if ( ! is_array($field['value'])) {
            $field['value'] = $this->defaults;
        }

        $values = $field['value'];

        include dirname($this->path).'/templates/field.php';
    }
}
