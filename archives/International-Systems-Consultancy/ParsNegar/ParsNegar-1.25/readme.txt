Please read this document before installation
---------------------------------------------

Make sure you read README.LIC before you install ParsNegar.

To install:

  * Unzip the compressed file into a floppy disk on the A: drive.

  * Run Windows.

  * From program Manager select File, Run...  and type in
         a:\setup
    and press enter.


ParsNegar is not free!  You are allowed to use ParsNegar for 30
days from the installation date for evaluation purposes.  By
installing ParsNegar on your PC, you agree to buy the complete
package or remove it from your PC after the 30 day evaluation
period!  Nothing will actually stop you running ParsNegar after
the evaluation period and we haven't crippled ParsNegar in any
way, that is because we rely on your honesty and we believe you
will support us by ordering your copy.

Please read the help files that comes with ParsNegar for usage
and registration information, F1 works through out ParsNegar to
give you help.

We hope you find ParsNegar of great use and benefit to you and
invest in our developments.

All registered users will receive offers to order exciting new 
font packs.  All registered users will receive a sample print 
out the fonts.  The font packs are only available to the 
registered users for the time being.


Tooraj Enayati.
International Systems Consultancy.

Internet: tooraj@daneel.rdt.monash.edu.au

Mail:     International Systems Consultancy
          P.O. Box 12603
          A'Beckett St.
          Melbourne 3000
          Australia

Please note our phone numbers have changed:

Fax: +61-3-9877-0025
Tel: +61-3-9877-0112


PLEASE NOTE
===========

If during the setup you get an error message indicating that
DDEML.DL_ can not be copied, you can safely ignore this message.

If you get the message for any other file, exit out of Windows 
and start Windows while holding down the shift key. This will 
stop Program Manager loading any programs. Try running the setup
before you run any other program.

If you use you use Norton Desktop, you will get a DDE error message
right after installation. You can safely ignore this message.

ParsNegar is designed to run under the English version of MS-
Windows only. It will not run under the Arabic, Persian versions
of Windows. ParsNegar is not supported under Windows 3.0 and
Windows NT. The installation will try to detect these environments
and warn you.

ParsNegar will run under the English version of Windows 3.1,
3.11, Windows for Workgroup 3.1, 3.11 and the pre-release
version of Windows 95 (build 490).

ParsNegar may or may not run properly under non-English versions
of Windows 3.1x (such as European, Russian, Greek, Turkish, Hebrew,
Far East versions).

There are no plans to produce Macintosh and DOS versions of the
product.


Known Limitations
=================

* ParsNegar can handle file sizes no greater than 25KB.

* ParsNegar does not word-wrap. You need to press enter before you
  reach the left margin.  Reducing the ParsNegar's window width can
  mess up lines in your document.

* You can only select one font for the text that you are entering into 
  the current document. You have to select the same font in the 
  destination application, where you have to copy and paste your text
  into. It is not bi-lingual.

* Contextual Analysis works only on the character to the right of the 
  caret (text cursor) when the caret is moved between two 
  characters and some new text is entered.

* Typing a shifted character will automatically select that 
  character (it will be highlighted!).  Typing anything after it
  will not overwrite that character as you'd expect it to do so.
  This makes it possible to enter shifted keys one after another.
  However, selecting a block of text and typing over it does not work,
  as one would expect!

* TAB key has a new functionality.  It acts as a short space character 
  when Contextual Analysis is enabled, otherwise it produces no character
  at all!  Short space is used when you want to change the form of the 
  character you have just typed to an end form. The functionality of TAB
  key is not offered.

* The usual Windows text handling keys , such as Ctrl V, C, X, Z, 
  Shift Ins, Ctrl Ins, and Alt BkSpace are not supported, neither have 
  been disabled.  Their use can cause unexpected effects and should be
  avoided.

* If you decide to cancel importing a Gerdsooz document while ParsNegar
  is doing the import,  you will only have one way to do this and that is
  to exit ParsNegar!  Press Alt F and while holding the Alt key press X.

* Gerdsooz import will import numbers in reverse order.


Product history
===============

Version 1.25
------------

This distribution includes version 1.25. The following problems
have been fixed:

* Configuration file is now called parsngr.ini.

* Clicking the unload button on the on-screen-keyboard always opened
  the control box menu. 

* The problem with the navigating the menus with keyboard keys have
  been fixed.

* The problem with print option not right aligning properly has been
   fixed.

* Save As... short cut has been fixed.

* While importing a Gerdsooz document, if the line length is longer
  than window width and carriage return is entered automatically.

* Importing Gerdsooz no longer adds blank lines to the end of the
  document.

* Importing Gerdsooz no longer causes messy screen if R->L is not
  enabled.


The following added or changed:

*  Keyboard definition keys are now larger.

*  On-Screen-Keyboard keys are now larger.

*  Keyboard definition routine has been moved to a module of its own.
   ParsNegar users can now receive keyboard definition files and add 
   them to ParsNegar setup.

*  Font layout definition routine has been moved to a module of its
   own. ParsNegar users can now receive font definition files and add
   them to ParsNegar setup.

*  ParsNegar now only list font that have been added by the initial 
   setup or the user.

*  A Keyboard definition can now be removed.

*  Margin setting option has been added.

*  Printing now check for line truncation and warns.

*  Printing now does proper page break.

*  ParsNegar now offers Rich Text Format export.

*  ParsNegar now a numeral pad to allow easy number entry.

*  Number of Farsi poems are reduced to reduce distribution size.

*  The manual is no longer included in the evaluation copy to reduce
   distribution size.

*  Many typos in the documentation and help file have been corrected.

*  The term Glyphic Management has been changed to the more appropriate 
   Contextual Analysis. Also character form names have been changed from
   First, Middle, End and Alone to Initial, Medial, Final and Isolated
   respectively.

*  CheeChest font is modified to correct a problem with isolated form of
   letter K.  All diacritics have been changed to become non-advancing
   characters. This allow entering these characters when Contextual Analysis
   is turned off or when text is pasted into the host application.



Version 1.01 to 1.25
--------------------

Internal versions, never released publicly.



Version 1.01
------------

* Word for Windows/WinWord 2.0x and 6.0x and HP laserjet printers
  do not show/print character 160 (decimal). (They change it to a
  space character).  The problem is with the fonts CheeChest and 
  Sahand that use character 160 for "yeh aval".  Rather than doing
  complete remapping of the fonts internal mapping. Font definition
  has been changed to swap characters 158 (less frequently used) with
  character 160.  Although this fixes the problem as char 158 is 
  hardly ever used in modern Persian, the use of these fonts for
  Arabic where this character (specifically its end and alone forms)
  are used more often could see the same problem.

* Copy and Paste sometimes didn't work properly. After something was
  pasted into the clipboard from Write, copying from ParsNegar and
  pasting into Write would bring what was pasted into the clipboard
  originally from Write.

* When the on screen keyboard and a modal dialogue box (like General,
  Font Definition etc.) were displayed switching to another 
  application and back would generate an error message and end ParsNegar.

* On-screen keyboard keys would grew after changing the font  a few times the
   keys would cover the one on above them.

* After Save As... and Printer Setup dialogue boxes were displayed the
  focus would no longer be on ParsNegar's edit windows.

* Some minor spelling and grammar mistakes in the help file were corrected.

* The browse buttons on the help file did not browse correctly through the
  help file.

* If ParsNegar was installed in the first nine days of a months it would
  produce an error (Err #13) message every time it was run.

* Despite the fact that ParsNegar is only supported on 16 bit Windows 3.1
  the setup would let you install it on Windows version earlier than 3.1.
  (Still lets you run setup on Windows NT 3.1 while ParsNegar will not run
  properly on NT!)

* Paste on Edit menu was spelled Paste!

* If ParsNegar was minimized or maximized it would still remember its window
  size and would case it to look messy the next time it was run.


The following added or changed:

* Gerdsooz files 022.gz and 023.gz were removed from the distribution.

* File MANUAL.DOC has been added to the distribution. It is the help file in
  Word for Windows 2.0 format.

* Colour setting option has been added to the Setup menu. Allows text
  and background colour setting.  Online help and the manuals do not make
  any references to these options.


Version 1.0
-----------

* Original distribution.
