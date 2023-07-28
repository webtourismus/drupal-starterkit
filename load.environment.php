<?php

declare(strict_types=1);

/**
 * This file is included very early. See autoload.files in composer.json and
 * https://getcomposer.org/doc/04-schema.md#files
 */

use \Dotenv\Dotenv;

/**
 * Load .env settings from either the current dir (typically on "prod" environment)
 * or the parent dir (typically on "dev" environment). If both files are found (typically dev),
 * values from the parent dir overrule values from the current dir.
 */
$dotenv = Dotenv::createUnsafeMutable([__DIR__, __DIR__ . '/..'], '.env', FALSE);
$dotenv->safeLoad();
