/*
 * Copyright (c) 2016 Antonio Aguilar
 *
 * This software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and non-infringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the software or the use or other dealings in this
 * software.
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

var app = angular.module('app', [
  'app.global',
  'app.templates',
  'app.providers',
  'app.services',
  'app.directives',
  'app.components',
  'app.controllers',
  'app.routes'
]);

app.config(function( $urlRouterProvider, $logProvider, $envProvider, $compileProvider ) {
  $urlRouterProvider.otherwise('/app');

  $envProvider.config({
    domains: {
      development: ['localhost'],
      production: ['localhost.com']
    },
    vars: {
      development: { apiUrl: 'localhost/api' },
      production: { apiUrl: 'localhost.com/api' }
    }
  });

  if( $envProvider.mode('production') ) {
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

});

app.run(function( $rootScope, $log, $env, $location ) {
  $rootScope.apiUrl = $location.protocol() + '://' + $env.key('apiUrl');

  $rootScope.$event.addWireTap(function( data, event ) {
    $log.debug(event);
  });

});
