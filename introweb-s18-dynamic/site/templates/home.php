<!DOCTYPE HTML>

<html>

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-113019983-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-113019983-1');

    </script>

    <title>
        <?php snippet('common/head_title') ?>
    </title>

    <?php snippet('common/head_meta') ?>

    <?php snippet('common/head_js') ?>

    <?php snippet('common/head_css') ?>
    <!-- User Heat Tag -->
    <script type="text/javascript">
        (function(add, cla) {
            window['UserHeatTag'] = cla;
            window[cla] = window[cla] || function() {
                (window[cla].q = window[cla].q || []).push(arguments)
            }, window[cla].l = 1 * new Date();
            var ul = document.createElement('script');
            var tag = document.getElementsByTagName('script')[0];
            ul.async = 1;
            ul.src = add;
            tag.parentNode.insertBefore(ul, tag);
        })('//uh.nakanohito.jp/uhj2/uh.js', '_uhtracker');
        _uhtracker({
            id: 'uho0M4NamS'
        });

    </script>
    <!-- End User Heat Tag -->
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
                    <h1>
                        <?php echo $page->head_title()->kirbytext() ?>
                    </h1>

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
