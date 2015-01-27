LaTeX homework compiler
=======================


This is a set of grunt tasks to better workflow writing LaTeX with text editors.

Usage
-----

In the root directory, run

    grunt go:<DOCUMENT>

where `<DOCUMENT>` is the name of the assignment you're working on. If it doesn't already exist,
it will make an assignment directory for you, using your template. It will also open your text editor,
and setup a watch task which will recompile, clean up build files, and open/refresh your output pdf. 

- You can specify your text editor through the `$EDITOR` environment variable (probably already defined for `git`), or explicitly in `package.json`
- You can specify your template file with the `$TEMPLATE` environment variable, or `package.json`. It defaults to looking for a file in the root directory called `template.tex`.
- As long as you have multiple grunt watch tasks running, you should be able to work on multiple assignments
at the same time.
- The `.gitignore` is set to ignore output files, so your repo isn't clogged by large output PDFs.

License
-------

GPL v3