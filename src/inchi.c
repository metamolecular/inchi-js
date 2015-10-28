/**
 * Copyright (C) 2015 Metamolecular, LLC.
 * Licensed under the terms of the
 * IUPAC/InChI-Trust InChI Licence No. 1.0
 */

#include "inchi_api.h"
#include "e_ichisize.h"
#include "e_mode.h"
#include "e_inpdef.h"

char *get_inchi(char *molfile)
{
  FILE *file = fmemopen(molfile, strlen(molfile), "r");
  inchi_Input input = { .num_atoms = 0, .num_stereo0D = 0 };
  int bMergeAllInputStructures = 0;
  int bDoNotAddH = 0;
  int bAllowEmptyStructure = 1;
  const char *pSdfLabel;
  char *pSdfValue;
  long *lSdfId;
  long *lMolfileNumber;
  INCHI_MODE *pInputAtomFlags;
  int err;
  char *pStrErr;
  
  int atomCount = e_MolfileToInchi_Input(file, &input,
    bMergeAllInputStructures, bDoNotAddH, bAllowEmptyStructure, pSdfLabel,
    pSdfValue, lSdfId, lMolfileNumber, pInputAtomFlags, &err, pStrErr);
  
  fclose(file);
  
  if (atomCount == 0) {
    return "\nMolfile is invalid.";
  }
  
  inchi_Output output;
  int status = GetStdINCHI(&input, &output);
  char *result = (status == 0 || status == 1) ?
    strdup(output.szInChI) : "\n";
    
  if (status != 0) {
    result = strcat(result, "\n");
    result = strcat(result, strdup(output.szMessage));
  }
  
  FreeINCHI(&output);

  return result;
}