<?php
c::set('debug', true);
// Enable Kirby StaticBuilder locally
c::set('staticbuilder', true);
// StaticBuilder requires Kirby’s cache to be disabled
c::set('cache', false);
// Works well for hosting on a domain or subdomain
c::set('staticbuilder.baseurl', './');