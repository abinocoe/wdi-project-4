angular
  .module("whatsupp")
  .controller("HomeCtrl", HomeCtrl);

HomeCtrl.$inject = ['Upload'];
function HomeCtrl(Upload){
  const vm = this;

  vm.upload = function(){
    if (vm.uploadForm.file.$valid && vm.file) {
      var file = vm.file;
      console.log(file);

      Upload.upload({
        url: '/upload',
        data: { file: file }
      }).then(function (response) {
        vm.data = response;
        console.log(response);
      }, function (response) {
        console.log('Error status: ' + response.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
  };
}
