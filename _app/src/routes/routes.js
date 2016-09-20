/*
 * Copyright (c) 2016 Antonio Aguilar
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

var routes = angular.module('app.routes', ['app.global']);

routes.config(function( $stateProvider ) {

  $stateProvider.state('app', {
    url: '/app',
    templateUrl: 'templates/default.tpl.html'
  });

});
