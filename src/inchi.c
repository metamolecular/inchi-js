/**
 * Copyright (C) 2015 Metamolecular, LLC.
 * Licensed under the terms of the
 * IUPAC/InChI-Trust InChI Licence No. 1.0
 */

#include <string.h>
#include "inchi_api.h"
#include "e_ichisize.h"
#include "e_mode.h"
#include "e_inpdef.h"
#include "e_ctl_data.h"

int molfile_to_inchi(char *molfile, char *out)
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
      strcpy(out, "invalid molfile");
      
      return -1;
    }
    
    inchi_Output output;
    int status = GetStdINCHI(&input, &output);
    
    if (status == 0 || status == 1) {
      strcpy(out, output.szInChI);
    } else {
      strcpy(out, output.szMessage);
    }
    
    FreeINCHI(&output);

    return status;
}

int inchi_to_key(char *inchi, char *out)
{
  return GetStdINCHIKeyFromStdINCHI(inchi, out);
}