<!DOCTYPE HTML>

<html>
    <head>
        <title><?php snippet('common/head_title') ?></title>

        <?php snippet('common/head_meta') ?>

        <?php snippet('common/head_js') ?>

        <?php snippet('common/head_css') ?>
    </head>
    <body class="<?php snippet('common/body_class') ?>">
        <!-- Wrapper -->
        <div id="wrapper">

            <?php snippet('common/header') ?>

            <?php snippet('common/nav') ?>

            <!-- Main -->
            <div id="main">
                <div class="inner">
                    <header>
                        <h1><?php echo $page->head_title()->kirbytext() ?></h1>

                        <?php echo $page->head_text()->kirbytext() ?>
                    </header>

                    <?php snippet('home/tiles') ?>
                </div>
            </div>

            <?php snippet('common/footer') ?>

        </div>

        <?php snippet('common/foot_js') ?>

    </body>
</html>