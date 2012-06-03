Lilypond export plugin for MuseScore 1.2+
-----

This simple plugin is meant to be modified to your needs. It saves a MusicXML file of the current score in the temporary folder of your operating system. Then it calls `musicxml2ly.py`, which is a python script, to convert MusicXML to LilyPond file. MusicXML2Ly is part of your LilyPond install and not part of MuseScore or this plugin. In turn, it calls `lilypond` on this LilyPond file and produce a PDF. The PDF is then opened with the configured PDF editor/viewer.

Note that there is no error check in this version of the plugin. Even the presence of the different files is not tested. So it works at best effort.

To configure the path to your LilyPond installation and to your PDF editor/viewer, edit the js file with a text editor and change the first lines of code to suit your environment. If you don't want the PDF file to be automatically opened, set the PDF editor/viewer path to `""`.
