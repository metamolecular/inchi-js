# Copyright (C) 2015 Metamolecular, LLC.
# Licensed under the terms of the
# IUPAC/InChI-Trust InChI Licence No. 1.0.

CC =           emcc
EXPORTED =     -s EXPORTED_FUNCTIONS="['_get_inchi', 'cwrap', 'onRuntimeInitialized']"
MAIN =         submod/inchi/INCHI_API/inchi_main/
DLL =          submod/inchi/INCHI_API/inchi_dll/
COMMON =       submod/inchi/INCHI/common/
INCHI_MAIN =   submod/inchi/INCHI_API/inchi_main/
BUILD =        build
INCHI =        src/inchi.c
INCHIJS =      $(BUILD)/inchi.js
MAIN_SOURCES = $(MAIN)e_mol2atom.c \
               $(MAIN)e_util.c \
               $(MAIN)e_readmol.c \
               $(MAIN)e_inchi_atom.c \
               $(MAIN)e_ichi_io.c
DLL_SOURCES  = $(DLL)inchi_dll.c \
               $(DLL)ichiprt2.c \
               $(DLL)ichiprt1.c \
               $(DLL)ichimak2.c \
               $(DLL)ichiprt3.c \
               $(DLL)ichicano.c \
               $(DLL)ichican2.c \
               $(DLL)ichimap1.c \
               $(DLL)ichimap2.c \
               $(DLL)ichimap4.c \
               $(DLL)runichi.c \
               $(DLL)ichimake.c \
               $(DLL)strutil.c \
               $(DLL)ichisort.c \
               $(DLL)ichi_io.c \
               $(DLL)ichinorm.c \
               $(DLL)ichicans.c \
               $(DLL)ichitaut.c \
               $(DLL)ichister.c \
               $(DLL)ichiring.c \
               $(DLL)ichi_bns.c \
               $(DLL)ichiqueu.c \
               $(DLL)ichiisot.c \
               $(DLL)ichiparm.c \
               $(DLL)ichilnct.c \
               $(DLL)util.c

production: rawjs
	@echo "(function(){" > $(INCHIJS).tmp
	@cat $(INCHIJS) >> $(INCHIJS).tmp
	@echo "})()" >> $(INCHIJS).tmp
	@mv $(INCHIJS).tmp $(INCHIJS)

rawjs:
	mkdir -p $(BUILD)
	$(CC) -I $(COMMON) -I $(INCHI_MAIN) $(INCHI) $(MAIN_SOURCES) $(DLL_SOURCES) $(EXPORTED) -o $(BUILD)/inchi.js -s -Oz -s EXPORT_NAME="'InChI'" --closure 1 -s NO_FILESYSTEM=1

debug:
	mkdir -p $(BUILD)
	$(CC) -I $(COMMON) -I $(INCHI_MAIN) $(INCHI) $(MAIN_SOURCES) $(DLL_SOURCES) $(EXPORTED) -o $(BUILD)/inchi.js -s ASSERTIONS=1