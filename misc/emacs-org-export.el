; export org project

(load-file "~/.emacs.d/init.el")
(message "elisp script org export")

(setq baseDir (getenv "_AB_BASE_DIR"))
(setq outputDir (getenv "_AB_OUTPUT_DIR"))
(setq postamble (getenv "_AB_POSTAMBLE"))
(setq preamble (getenv "_AB_PREAMBLE"))

(setq org-publish-project-alist
  `(
    ("abOrgContent"
     :base-directory ,baseDir
     :publishing-directory ,outputDir
     :base-extension "org"
     :recursive t
     :publishing-function org-html-publish-to-html
     :headline-levels 4
     :auto-preamble t
     :auto-sitemap nil
     :export-creator-info nil
     :export-author-info nil
     :auto-postamble nil
     :table-of-contents nil
     :section-numbers nil
     :html-head-include-default-style  nil
     :html-head-include-scripts nil
     :html-postamble ,postamble
     :html-preamble ,preamble)
    ("abOrg" :components ("abOrgContent"))))

(defun export ()
  (setq orgProject "abOrg")
  (setq forceExport
    (not (string= (getenv "_AB_ORG_PROJECT_FORCE_EXPORT") nil)))
  (message "Exporting org project %s" orgProject)
  (message "force export %s" forceExport)
  (message "force export :(%s)" (getenv "_AB_ORG_PROJECT_FORCE_EXPORT"))
  (org-publish-project orgProject forceExport))
