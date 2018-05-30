Contributing to lvo-logging-lib
================================

We welcome any kind of contribution.  If you think you've found a bug
or there is a feature missing, please
[open an issue](https://github.com/LVM-IT/lvo-logging-lib/issues); we not
only gladly accept
[pull requests](https://github.com/LVM-IT/lvo-logging-lib/pulls), we prefer
them for smaller changes.

For legal reasons (protection against copyright/patent lawsuits) we cannot use contributions right away.
We ask all contributors to sign an agreement as [TOSSCA contributor](http://tossca.com/en/starter-kit)
either as individual contributor or as contributor being listed by a company which has
signed the CA.

When creating pull requests, the usual rules of common sense like
"don't mix reformatting code and code changes" apply.  A list we've
borrowed from somewhere else describes the process:

Preparing a Pull Request
------------------------

+ Create a topic branch from where you want to base your work (this is
  usually the master branch).
+ Make commits of logical units.
+ Respect the original code style ([Angular Styleguide](https://angular.io/styleguide)):
  + Only use spaces for indentation.
  + Create minimal diffs - disable on save actions like reformat
    source code or organize imports. If you feel the source code
    should be reformatted create a separate issue/PR for this change.
  + Check with `ng lint` if your changes are compliant with the styleguide.
+ Make sure your commit messages are in the proper format. Your commit
  message should contain the key of the issue if you created one.
+ Make sure you have added the necessary tests for your changes.
+ Run all the tests with `ng test` or to assure nothing else
  was accidentally broken.
+ Run all e2e Tests with `npm run e2e`
+ Check if the library is still able to be build with `npm run build`

Thanks for taking the time to read this guide, we are looking forward to your contribution!
