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
  public function backendCss() {
    $inputFile = '/modules/custom/backend/tailwind/gin-custom.css';
    $outputFile = '/sites/default/files/gin-custom.css';

    $inputParamenter = realpath(DRUPAL_ROOT . $inputFile);
    $outputParamenter = realpath(DRUPAL_ROOT . $outputFile);

    $this->io()->text("Compiling '{$inputFile}' to '{$outputFile}'");
    $returnCode = $this->compiler->runCompiler(" --input={$inputParamenter} --output={$outputParamenter} --minify", $output, $message);
    if ($returnCode) {
      $this->io()->error('An error has occured.');
      $this->io()->text($output);
    }
    $this->io()->text($message);
  }
}
