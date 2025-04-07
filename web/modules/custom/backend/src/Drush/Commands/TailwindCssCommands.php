<?php

namespace Drupal\backend\Drush\Commands;

use Drupal\tailwind_jit\Compiler;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

final class TailwindCssCommands extends DrushCommands {

  /**
   * Constructs a MaintenanceCommands object.
   */
  public function __construct(
    protected Compiler $compiler,
  ) {
    parent::__construct();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('tailwind_jit.compiler'),
    );
  }

  /**
   * Creates /sites/default/files/gin_custom.css to customize Gin admin theme.
   */
  #[CLI\Command(name: 'backend:css', aliases: ['css'])]
  #[CLI\Usage(name: 'backend:css', description: 'Compile TailwindCSS for Gin admin theme.')]
  #[CLI\Option(name: 'input', description: 'Uncompiled TailwindCSS input file.')]
  #[CLI\Option(name: 'output', description: 'Compiled plain CSS output file.')]
  #[CLI\Option(name: 'minify', description: 'Minify compiled CSS.')]
  public function backendCss($options = [
    'input' => '/modules/custom/backend/tailwind/gin-custom.css',
    'output' => '/sites/default/files/gin-custom.css',
    'minify' => TRUE,
  ]) {
    $inputFullPath = realpath(DRUPAL_ROOT . $options['input']);
    $outputFullPath = realpath(DRUPAL_ROOT . $options['output']);
    if (!$outputFullPath) {
      exec('touch ' . DRUPAL_ROOT . $options['output']);
      $outputFullPath = realpath(DRUPAL_ROOT . $options['output']);
      if (!$outputFullPath) {
        $this->io()->error('Unable to read output file destination.');
      }
    }

    $minify = $options['minify'] ? '--minify' : '';

    $this->io()->text("Compiling '{$options['input']}' to '{$options['output']}'");
    $returnCode = $this->compiler->runCompiler(" --input={$inputFullPath} --output={$outputFullPath} {$minify}", $output, $message);
    if ($returnCode) {
      $this->io()->error('An error has occured.');
      $this->io()->text($output);
    }
    $this->io()->text($message);
  }
}
