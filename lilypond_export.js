//=============================================================================
//  MuseScore
//  Music Score Editor
//  $Id:$
//
//  lilypond process plugin via musicxml2ly
//
//  Copyright (C)2011 lasconic
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License version 2.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//=============================================================================


//Switch the comment if you are on a mac
//var lilypondProgram = "C:/Program Files/LilyPond/usr/bin/lilypond.exe";
//var musicxml2lyProgram = "C:/Program Files/LilyPond/usr/bin/musicxml2ly.py";
//var pdfViewerProgram = "C:/Program Files/Foxit Software/Foxit Reader/Foxit Reader.exe";

var lilypondProgram = "/Applications/Lilypond.app/Contents/Resources/bin/lilypond";
var musicxml2lyProgram = "/Applications/Lilypond.app/Contents/Resources/bin/musicxml2ly";
var pdfViewerProgram = "open";


function init()
      {
      }

function run()
      {
      // temp folder for user  C:\Users\<USERNAME>\AppData\Local\Temp on windows
      var path = QDir.tempPath(); 
      var xmlfile = path + "/score.xml";
      var lyfile = path + "/score.ly";
      var pdffile = path + "/score";
      curScore.save(xmlfile, "xml");
      
      //See http://doc.qt.nokia.com/latest/qprocess.html
      var musicxml2ly = new QProcess();
      var args = new Array();
      args[0]= musicxml2lyProgram;
      args[1]= "-o";
      args[2]= lyfile;
      args[3]= xmlfile;
      
      // if you want to log output
      musicxml2ly.setStandardOutputFile(path+"/stdoutm.txt");
      musicxml2ly.setStandardErrorFile(path+"/stderrm.txt");

      musicxml2ly.start("python", args );
      musicxml2ly.waitForStarted();
      musicxml2ly.waitForFinished();
      
      var lilypond = new QProcess();
      args = new Array();
      args[0]= "-o";
      args[1]= pdffile;
      args[2]= lyfile;
      
      // if you want to log output
      lilypond.setStandardOutputFile(path+"/stdoutl.txt");
      lilypond.setStandardErrorFile(path+"/stderrl.txt");

      lilypond.start(lilypondProgram, args );
      lilypond.waitForStarted();
      lilypond.waitForFinished();
      
      
      if(pdfViewerProgram != "") {
          var pdfViewer = new QProcess();
          args = new Array();
          args[0]= pdffile + ".pdf";
    
          pdfViewer.start(pdfViewerProgram, args );
          pdfViewer.waitForStarted();
      }
      
      }

//---------------------------------------------------------
//    menu:  defines were the function will be placed
//           in the MuseScore menu structure
//---------------------------------------------------------

var mscorePlugin = {
      menu: 'Plugins.LilyPond Output',
      init: init,
      run:  run
      };

mscorePlugin;