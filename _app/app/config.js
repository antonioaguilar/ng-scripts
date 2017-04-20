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

function loadAppConfiguration(options) {
  var $injector = angular.injector(['ng']);
  var $http = $injector.get('$http');

  function validateJSON(data) {
    try {
      return JSON.parse(data);
    }
    catch(e) {
      console.error('JSON syntax error in ' + options.configUrl);
      return false;
    }
  }

  function onSuccess(response) {
    var config = response.data ? response.data : {};
    app.constant('$config', config);
    angular.element('#loading').hide();
  }

  function onFailure(response) {
    angular.element('#loading').show();
    throw new Error(response);
  }

  return $http({
    method: 'GET',
    url: options.configUrl,
    transformResponse: validateJSON
  }).then(onSuccess, onFailure);
}

function startApp() {
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });
}

loadAppConfiguration({
  configUrl: 'config/env.json'
}).then(startApp);
