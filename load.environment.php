<?php

declare(strict_types=1);

/**
 * This file is included very early. See autoload.files in composer.json and
 * https://getcomposer.org/doc/04-schema.md#files
 */

use \Dotenv\Dotenv;

/**
 * Load credentials and system settings.
 *
 * The loader also checks for the parent directory as fallback,
 * typically used on "dev" environments.
 */
$dotenv = Dotenv::createUnsafeImmutable([__DIR__ . '/..', __DIR__], '.env', FALSE);
$dotenv->safeLoad();
