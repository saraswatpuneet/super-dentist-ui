export interface DentalBreakDowns {
  key: string;
  label: string;
  breakDownKeys?: string[];
  breakDowns?: DentalBreakDown;
}

export interface DentalBreakDown {
  [key: string]: DentalBreakDowns;
}

export const dentalBreakDowns: DentalBreakDowns = {
  key: 'categories',
  label: 'Categories',
  breakDownKeys: ['D0100-D0999', 'D1000-D1999', 'D2000-D2999', 'D3000-D3999', 'D4000-D4999', 'D5000-D5999', 'D5900-D5999', 'D6000-D6199', 'D6200-D6999', 'D7000-D7999', 'D8000-D8999', 'D9000-D10000'],
  breakDowns: {
    'D0100-D0999': {
      key: 'D0100-D0999',
      label: 'DIAGNOSTIC',
      breakDownKeys: [
        'D0120',
        'D0140',
        'D0145',
        'D0150',
        'D0160',
        'D0170',
        'D0171',
        'D0180',
        'D0210',
        'D0220',
        'D0230',
        'D0240',
        'D0270',
        'D0272',
        'D0273',
        'D0274',
        'D0277',
        'D0330',
        'D0340',
        'D0350',
        'D0364',
        'D0365',
        'D0366',
        'D0367',
        'D0419',
        'D0460',
        'D0470',
        'D0472'
      ],
      breakDowns: {
        "D0120": {
          "key": "D0120",
          "label": "Periodic Oral Evaluation"
        },
        "D0140": {
          "key": "D0140",
          "label": "Limited Oral Eval Prob Focused"
        },
        "D0145": {
          "key": "D0145",
          "label": "Oral Eval Pt Under 3 Yrs, Counsel Primary"
        },
        "D0150": {
          "key": "D0150",
          "label": "Compsve Oral Eval- New/Est Pat"
        },
        "D0160": {
          "key": "D0160",
          "label": "Detailed & Ext Oral Eval By Rp"
        },
        "D0170": {
          "key": "D0170",
          "label": "Re-Evaluation- Limited"
        },
        "D0171": {
          "key": "D0171",
          "label": "Re-Evaluation - Post-Operative Office Visit"
        },
        "D0180": {
          "key": "D0180",
          "label": "Compsve Perio Eval New/Est Pat"
        },
        "D0210": {
          "key": "D0210",
          "label": "Intraoral - Complete Series Of Radiographic Images"
        },
        "D0220": {
          "key": "D0220",
          "label": "Intraoral - Peripical First Radiographic Image"
        },
        "D0230": {
          "key": "D0230",
          "label": "Intraoral - Peripical Each Addl Radiographic Image"
        },
        "D0240": {
          "key": "D0240",
          "label": "Intraoral - Occlusal Radiographic Image"
        },
        "D0270": {
          "key": "D0270",
          "label": "Bitewing - Single Radiographic Image"
        },
        "D0272": {
          "key": "D0272",
          "label": "Bitewings - Two Radiographic Images"
        },
        "D0273": {
          "key": "D0273",
          "label": "Bitewings - Three Radiographic Images"
        },
        "D0274": {
          "key": "D0274",
          "label": "Bitewings - Four Radiographic Images"
        },
        "D0277": {
          "key": "D0277",
          "label": "Vertical Bitewings - 7-8 Radiographic Images"
        },
        "D0330": {
          "key": "D0330",
          "label": "Panoramic Radiographic Image"
        },
        "D0340": {
          "key": "D0340",
          "label": "2D Cephalometric Radiographic Image"
        },
        "D0350": {
          "key": "D0350",
          "label": "2D Oral/Facial Photographic Image-Intraoral/Extrao"
        },
        "D0364": {
          "key": "D0364",
          "label": "Cone Beam CT Limited View - Less Than Whole Jaw"
        },
        "D0365": {
          "key": "D0365",
          "label": "Cone Beam CT Full Arch View - Mandible"
        },
        "D0366": {
          "key": "D0366",
          "label": "Cone Beam CT Full Arch View - Maxilla W/wo Cranium"
        },
        "D0367": {
          "key": "D0367",
          "label": "Cone Beam CT Full 2 Jaw View W/wo Cranium"
        },
        "D0419": {
          "key": "D0419",
          "label": "Assessment Of Salivary Flow By Measurement"
        },
        "D0460": {
          "key": "D0460",
          "label": "Pulp Vitality Tests"
        },
        "D0470": {
          "key": "D0470",
          "label": "Diagnostic Casts"
        },
        "D0472": {
          "key": "D0472",
          "label": "Accession - Gross"
        }
      }
    },
    'D1000-D1999': {
      key: 'D1000-D1999',
      label: 'PREVENTIVE',
      breakDownKeys: [
        'D1110',
        'D1120',
        'D1206',
        'D1330',
        'D1351',
        'D1352',
        'D1353',
        'D1354',
        'D1551',
        'D1552',
        'D1553',
        'D1556',
        'D1557',
        'D1558',
        'D1575'
      ],
      breakDowns: {
        "D1110": {
          "key": "D1110",
          "label": "Prophylaxis - Adult"
        },
        "D1120": {
          "key": "D1120",
          "label": "Prophylaxis - Child"
        },
        "D1206": {
          "key": "D1206",
          "label": "Topical Application Of Fluoride Varnish"
        },
        "D1330": {
          "key": "D1330",
          "label": "Oral Hygiene Instructions"
        },
        "D1351": {
          "key": "D1351",
          "label": "Sealant - Per Tooth"
        },
        "D1352": {
          "key": "D1352",
          "label": "Prev Resin Restoratn In Mod-high Caries Pt (Perman"
        },
        "D1353": {
          "key": "D1353",
          "label": "Sealant Repair - Per Tooth"
        },
        "D1354": {
          "key": "D1354",
          "label": "Interim Caries Arresting Medcmnt Applctn-Per Tooth"
        },
        "D1551": {
          "key": "D1551",
          "label": "Re-Cement/Re-Bond Bilateral Space Maintainer - Max"
        },
        "D1552": {
          "key": "D1552",
          "label": "Re-cement/Re-Bond Bilateral Space Maintainer-Mand"
        },
        "D1553": {
          "key": "D1553",
          "label": "Recement/Rebond Unilateral Space Maint - Per Quad"
        },
        "D1556": {
          "key": "D1556",
          "label": "Remove Fixed Unilateral Space Maintainer- Per Quad"
        },
        "D1557": {
          "key": "D1557",
          "label": "Remove Fixed Unilateral Space Maintainer - Max"
        },
        "D1558": {
          "key": "D1558",
          "label": "Remove Fixed Bilateral Space Maintainer - Mand"
        },
        "D1575": {
          "key": "D1575",
          "label": "Distal Shoe Space Maintainer-Fixed-Unilateral"
        }
      }
    },
    'D2000-D2999': {
      key: 'D2000-D2999',
      label: 'RESTORATIVE',
      breakDownKeys: [
        'D2330',
        'D2331',
        'D2332',
        'D2335',
        'D2390',
        'D2391',
        'D2392',
        'D2393',
        'D2394',
        'D2610',
        'D2620',
        'D2630',
        'D2642',
        'D2643',
        'D2644',
        'D2740',
        'D2750',
        'D2752',
        'D2753',
        'D2753A',
        'D2790',
        'D2799',
        'D2910',
        'D2915',
        'D2920',
        'D2921',
        'D2929',
        'D2940',
        'D2950',
        'D2954',
        'D2955',
        'D2960',
        'D2962',
        'D2975',
        'D2980',
        'D2982',
        'D2983',
        'D2990',
        'D2999'
      ],
      breakDowns: {
        "D2330": {
          "key": "D2330",
          "label": "Resin Composite One Surface Anterior"
        },
        "D2331": {
          "key": "D2331",
          "label": "Resin Composite Two Surfaces Anterior"
        },
        "D2332": {
          "key": "D2332",
          "label": "Resin Composite Three Surfaces Anterior"
        },
        "D2335": {
          "key": "D2335",
          "label": "Resin Composite Four/More Surf Anterior"
        },
        "D2390": {
          "key": "D2390",
          "label": "Resin Composite Crown Anterior"
        },
        "D2391": {
          "key": "D2391",
          "label": "Resin Composite One Surface Posterior"
        },
        "D2392": {
          "key": "D2392",
          "label": "Resin Composite Two Surfaces Posterior"
        },
        "D2393": {
          "key": "D2393",
          "label": "Resin Composite Three Surfaces Posterior"
        },
        "D2394": {
          "key": "D2394",
          "label": "Resin Composite Four/More Surfaces Posterior"
        },
        "D2610": {
          "key": "D2610",
          "label": "Inlay Porcelain/Ceramic One Surface"
        },
        "D2620": {
          "key": "D2620",
          "label": "Inlay Porcelain/Ceramic Two Surfaces"
        },
        "D2630": {
          "key": "D2630",
          "label": "Inlay Porcelain/Ceramic Three+ Surfaces"
        },
        "D2642": {
          "key": "D2642",
          "label": "Onlay Porcelain/Ceramic Two Surfaces"
        },
        "D2643": {
          "key": "D2643",
          "label": "Onlay Porcelain/Ceramic Three Surfaces"
        },
        "D2644": {
          "key": "D2644",
          "label": "Onlay Porcelain/Ceramic Four+ Surfaces"
        },
        "D2740": {
          "key": "D2740",
          "label": "Crown Porcelain/Ceramic"
        },
        "D2750": {
          "key": "D2750",
          "label": "Crown Porcelain Fused High Noble Metal"
        },
        "D2752": {
          "key": "D2752",
          "label": "Crown Porcelain Fused Noble Metal"
        },
        "D2753": {
          "key": "D2753",
          "label": "Crown- Porcelain Fused To Titanium/titanium Alloys"
        },
        "D2753A": {
          "key": "D2753A",
          "label": "Crown - Porcelain Fused To Titanium/Titanium Alloy"
        },
        "D2790": {
          "key": "D2790",
          "label": "Crown Full Cast High Noble Metal"
        },
        "D2799": {
          "key": "D2799",
          "label": "Provisional Crown - Further TX/Completion Necessar"
        },
        "D2910": {
          "key": "D2910",
          "label": "Recement Or Rebond Inlay/Onlay/Veneer/Partial Cvrg"
        },
        "D2915": {
          "key": "D2915",
          "label": "Recement Or Rebond Indirect Fab Or Prefab Post/Cor"
        },
        "D2920": {
          "key": "D2920",
          "label": "Recement Or Rebond Crown"
        },
        "D2921": {
          "key": "D2921",
          "label": "Reattachment Of Tooth Fragment, Incisal Edge/Cusp"
        },
        "D2929": {
          "key": "D2929",
          "label": "Prefabricated Porcelain/Ceramic Crown - Primary"
        },
        "D2940": {
          "key": "D2940",
          "label": "Protective Restoration"
        },
        "D2950": {
          "key": "D2950",
          "label": "Core Buildup, Including Any Pins When Required"
        },
        "D2954": {
          "key": "D2954",
          "label": "Prefab Post & Core (Addition To Crown)"
        },
        "D2955": {
          "key": "D2955",
          "label": "Post Removal"
        },
        "D2960": {
          "key": "D2960",
          "label": "Labial Veneer Resin Laminate Chair"
        },
        "D2962": {
          "key": "D2962",
          "label": "Labial Veneer Porcelain Laminate Lab"
        },
        "D2975": {
          "key": "D2975",
          "label": "Coping"
        },
        "D2980": {
          "key": "D2980",
          "label": "Crown Repair - Restorative Material Failure"
        },
        "D2982": {
          "key": "D2982",
          "label": "Onlay Repair - Restorative Material Failure"
        },
        "D2983": {
          "key": "D2983",
          "label": "Veneer Repair - Restorative Material Failure"
        },
        "D2990": {
          "key": "D2990",
          "label": "Resin Infiltration Incipient Smooth Surface Lesion"
        },
        "D2999": {
          "key": "D2999",
          "label": "Unspec Rest Proc/Rpt"
        }
      }
    },
    'D3000-D3999': {
      key: 'D3000-D3999',
      label: 'ENDODONTICS',
      breakDownKeys: [
        'D3110',
        'D3120',
        'D3220',
        'D3221',
        'D3230',
        'D3240',
        'D3310',
        'D3320',
        'D3330',
        'D3331',
        'D3332',
        'D3333',
        'D3346',
        'D3347',
        'D3348',
        'D3351',
        'D3352',
        'D3353',
        'D3410',
        'D3421',
        'D3425',
        'D3426',
        'D3910',
        'D3920',
        'D3950',
        'D3999'
      ],
      breakDowns: {
        "D3110": {
          "key": "D3110",
          "label": "Pulp Cap Direct"
        },
        "D3120": {
          "key": "D3120",
          "label": "Pulp Cap Indirect"
        },
        "D3220": {
          "key": "D3220",
          "label": "Therapeutic Pulpotomy"
        },
        "D3221": {
          "key": "D3221",
          "label": "Pulpal Debridement Prem/Prim"
        },
        "D3230": {
          "key": "D3230",
          "label": "Pulpal Therapy Anterior Primy"
        },
        "D3240": {
          "key": "D3240",
          "label": "Pulpal Therapy Posterior Primy"
        },
        "D3310": {
          "key": "D3310",
          "label": "Endodontic Therapy, Anterior Tooth"
        },
        "D3320": {
          "key": "D3320",
          "label": "Endodontic Therapy, Premolar Tooth"
        },
        "D3330": {
          "key": "D3330",
          "label": "Endodontic Therapy, Molar Tooth"
        },
        "D3331": {
          "key": "D3331",
          "label": "Treatment Of Root Canal Obstruction"
        },
        "D3332": {
          "key": "D3332",
          "label": "Incomp Endo Therapy Inperable"
        },
        "D3333": {
          "key": "D3333",
          "label": "Endo - Internal Root Repair"
        },
        "D3346": {
          "key": "D3346",
          "label": "Retreat RCT/Anterior"
        },
        "D3347": {
          "key": "D3347",
          "label": "Retreatment-Previous Root Canal Therapy-Premolar"
        },
        "D3348": {
          "key": "D3348",
          "label": "Retreat RCT/Molar"
        },
        "D3351": {
          "key": "D3351",
          "label": "Apexification/Recalcification - Initial Visit"
        },
        "D3352": {
          "key": "D3352",
          "label": "Apexification/Recalcification - Interim Medication"
        },
        "D3353": {
          "key": "D3353",
          "label": "Apexification/Recalcification (Final)"
        },
        "D3410": {
          "key": "D3410",
          "label": "Apicoectomy - Anterior"
        },
        "D3421": {
          "key": "D3421",
          "label": "Apicoectomy - Premolar (First Root)"
        },
        "D3425": {
          "key": "D3425",
          "label": "Apicoectomy - Molar (First Root)"
        },
        "D3426": {
          "key": "D3426",
          "label": "Apicoectomy - Each Additional Root"
        },
        "D3910": {
          "key": "D3910",
          "label": "Sur Proc Isoltn Tooth W/Rubdam"
        },
        "D3920": {
          "key": "D3920",
          "label": "Hemisection Not Incl RCT"
        },
        "D3950": {
          "key": "D3950",
          "label": "Canal Preparation- Perfmd Post"
        },
        "D3999": {
          "key": "D3999",
          "label": "Unspecified Endo By Report"
        }
      }
    },
    'D4000-D4999': {
      key: 'D4000-D4999',
      label: 'PERIODONTICS',
      breakDownKeys: [
        'D4210',
        'D4211',
        'D4212',
        'D4230',
        'D4231',
        'D4240',
        'D4241',
        'D4245',
        'D4249',
        'D4260',
        'D4261',
        'D4263',
        'D4264',
        'D4265',
        'D4266',
        'D4267',
        'D4268',
        'D4270',
        'D4273',
        'D4274',
        'D4275',
        'D4276',
        'D4277',
        'D4278',
        'D4283',
        'D4285',
        'D4320',
        'D4321',
        'D4341',
        'D4342',
        'D4346',
        'D4355',
        'D4381',
        'D4910',
        'D4920',
        'D4921',
        'D4999'
      ],
      breakDowns: {
        "D4210": {
          "key": "D4210",
          "label": "Gingect/Gingipsty 4+T/Per Quad"
        },
        "D4211": {
          "key": "D4211",
          "label": "Ginvect/Gingipsty 1-3t Pr Quad"
        },
        "D4212": {
          "key": "D4212",
          "label": "Gingect/Gingipsty For Restorative Proc, Per Tooth"
        },
        "D4230": {
          "key": "D4230",
          "label": "Anatomical Crown Exposure 4+T/Bound Space,Per Quad"
        },
        "D4231": {
          "key": "D4231",
          "label": "Anatomical Crown Exposure 1-3T/Bound Space PerQuad"
        },
        "D4240": {
          "key": "D4240",
          "label": "Gingiv Flap Rtpln 4+T/Per Quad"
        },
        "D4241": {
          "key": "D4241",
          "label": "Gingi Flap Rtpln 1-3t Pr Quad"
        },
        "D4245": {
          "key": "D4245",
          "label": "Apically Position Flap"
        },
        "D4249": {
          "key": "D4249",
          "label": "Clinical Crwn Lngthng Hard Tis"
        },
        "D4260": {
          "key": "D4260",
          "label": "Osseous Surgery 4+T/Per Quad"
        },
        "D4261": {
          "key": "D4261",
          "label": "Osseous Surgery 1-3t Pr Quad"
        },
        "D4263": {
          "key": "D4263",
          "label": "Bone Replacement Graft-Retained Natural Tooth, 1st"
        },
        "D4264": {
          "key": "D4264",
          "label": "Bone Replacement Graft-Retained Natural Tooth,Addl"
        },
        "D4265": {
          "key": "D4265",
          "label": "Bio Materials Aid Tissue Regen"
        },
        "D4266": {
          "key": "D4266",
          "label": "Guided Tissue Regen Resorbable"
        },
        "D4267": {
          "key": "D4267",
          "label": "Guided Tissue Regen Nonresorba"
        },
        "D4268": {
          "key": "D4268",
          "label": "Surgical Revise Proc Per Tooth"
        },
        "D4270": {
          "key": "D4270",
          "label": "Pedicle Soft Tissue Graft"
        },
        "D4273": {
          "key": "D4273",
          "label": "Autogenous CT Graft-1st Tooth/Implant/Endentulous"
        },
        "D4274": {
          "key": "D4274",
          "label": "Mesial/Distal Wedge Procedure, Single Tooth"
        },
        "D4275": {
          "key": "D4275",
          "label": "Non-Autogenous CT Graft- 1st Tooth/Implant/Endentu"
        },
        "D4276": {
          "key": "D4276",
          "label": "Combined CT & Double Pedicle Graft, Per Tooth"
        },
        "D4277": {
          "key": "D4277",
          "label": "Free Soft Tissue Graft - First Tooth In Graft"
        },
        "D4278": {
          "key": "D4278",
          "label": "Free Soft Tissue Graft - Addl Tooth In Graft"
        },
        "D4283": {
          "key": "D4283",
          "label": "Autogenous CT Graft-Ea Contig Tooth In Site"
        },
        "D4285": {
          "key": "D4285",
          "label": "Non-Autogenous CT Graft-Ea Contig Tooth In Site"
        },
        "D4320": {
          "key": "D4320",
          "label": "Provis Splinting Intracoronal"
        },
        "D4321": {
          "key": "D4321",
          "label": "Provsnl Splinting Extracoronal"
        },
        "D4341": {
          "key": "D4341",
          "label": "Perio Sclg Rt Pln 4+T/Per Quad"
        },
        "D4342": {
          "key": "D4342",
          "label": "Perio Sclg Rt Pln 1-3t Pr Quad"
        },
        "D4346": {
          "key": "D4346",
          "label": "Scaling Generalized Mod/Severe Gingival Inflam-FM"
        },
        "D4355": {
          "key": "D4355",
          "label": "Full Mouth Debridement - Subsequent Visit"
        },
        "D4381": {
          "key": "D4381",
          "label": "Localized Delivery Antimicrobial Agents Controlled"
        },
        "D4910": {
          "key": "D4910",
          "label": "Periodontal Maintenance"
        },
        "D4920": {
          "key": "D4920",
          "label": "Unscheduled Dressing Change"
        },
        "D4921": {
          "key": "D4921",
          "label": "Gingival Irrigation - Per Quadrant"
        },
        "D4999": {
          "key": "D4999",
          "label": "Unspecified Perio Pr By Rp"
        }
      }
    },
    'D5000-D5999': {
      key: 'D5000-D5999',
      label: 'PROSTHODONTICS',
      breakDownKeys: [
        'D5110',
        'D5120',
        'D5130',
        'D5140',
        'D5211',
        'D5212',
        'D5213',
        'D5214',
        'D5221',
        'D5222',
        'D5223',
        'D5224',
        'D5225',
        'D5226',
        'D5282',
        'D5283',
        'D5284',
        'D5286',
        'D5410',
        'D5411',
        'D5421',
        'D5422',
        'D5511',
        'D5512',
        'D5520',
        'D5611',
        'D5612',
        'D5621',
        'D5622',
        'D5630',
        'D5640',
        'D5650',
        'D5660',
        'D5670',
        'D5671',
        'D5710',
        'D5711',
        'D5720',
        'D5721',
        'D5730',
        'D5731',
        'D5740',
        'D5741',
        'D5750',
        'D5751',
        'D5760',
        'D5761',
        'D5810',
        'D5811',
        'D5820',
        'D5821',
        'D5850',
        'D5851',
        'D5862',
        'D5863',
        'D5864',
        'D5865',
        'D5866',
        'D5867',
        'D5875',
        'D5876'
      ],
      breakDowns: {
        "D5110": {
          "key": "D5110",
          "label": "Complete Denture - Maxillary"
        },
        "D5120": {
          "key": "D5120",
          "label": "Complete Denture - Mandibular"
        },
        "D5130": {
          "key": "D5130",
          "label": "Immediate Denture - Maxillary"
        },
        "D5140": {
          "key": "D5140",
          "label": "Immediate Denture - Mandibular"
        },
        "D5211": {
          "key": "D5211",
          "label": "Max Partial Denture Resin Base"
        },
        "D5212": {
          "key": "D5212",
          "label": "Man Partial Denture Resin Base"
        },
        "D5213": {
          "key": "D5213",
          "label": "Max Partial Denture Cast Metal"
        },
        "D5214": {
          "key": "D5214",
          "label": "Man Partial Denture Cast Metal"
        },
        "D5221": {
          "key": "D5221",
          "label": "Immediate Maxillary Partial Denture - Resin Base"
        },
        "D5222": {
          "key": "D5222",
          "label": "Immediate Mandibular Partial Denture - Resin Base"
        },
        "D5223": {
          "key": "D5223",
          "label": "Immediate Maxillary Partial Denture - Cast Metal"
        },
        "D5224": {
          "key": "D5224",
          "label": "Immediate Mandibular Partial Denture - Cast Metal"
        },
        "D5225": {
          "key": "D5225",
          "label": "Max Partial Denture - Flex Bas"
        },
        "D5226": {
          "key": "D5226",
          "label": "Man Partial Denture - Flex Bas"
        },
        "D5282": {
          "key": "D5282",
          "label": "Removable Unilateral Prtl Dntr-One Pc Cst Mtl, Max"
        },
        "D5283": {
          "key": "D5283",
          "label": "Removable Unilateral Prtl Dntr-One Pc Cst Mtl, Man"
        },
        "D5284": {
          "key": "D5284",
          "label": "Removable Unilateral Part Dent-flex Base- Per Quad"
        },
        "D5286": {
          "key": "D5286",
          "label": "Removable Unilateral Part Dent- Resin - Per Quad"
        },
        "D5410": {
          "key": "D5410",
          "label": "Adjust Complete Denture Maxil"
        },
        "D5411": {
          "key": "D5411",
          "label": "Adjust Complete Denture Mand"
        },
        "D5421": {
          "key": "D5421",
          "label": "Adjust Partial Denture Max"
        },
        "D5422": {
          "key": "D5422",
          "label": "Adjust Partial Denture Mand"
        },
        "D5511": {
          "key": "D5511",
          "label": "Repair Broken Complete Denture Base, Mandibular"
        },
        "D5512": {
          "key": "D5512",
          "label": "Repair Broken Complete Denture Base, Maxillary"
        },
        "D5520": {
          "key": "D5520",
          "label": "Replace Missing Or Brkn Teeth"
        },
        "D5611": {
          "key": "D5611",
          "label": "Repair Resin Partial Denture Base, Mandibular"
        },
        "D5612": {
          "key": "D5612",
          "label": "Repair Resin Partial Denture Base, Maxillary"
        },
        "D5621": {
          "key": "D5621",
          "label": "Repair Cast Partial Denture Base, Mandibular"
        },
        "D5622": {
          "key": "D5622",
          "label": "Repair Cast Partial Denture Base, Maxillary"
        },
        "D5630": {
          "key": "D5630",
          "label": "Repair Or Replace Broken Clasp - Per Tooth"
        },
        "D5640": {
          "key": "D5640",
          "label": "Replace Broken Teeth-Per Tooth"
        },
        "D5650": {
          "key": "D5650",
          "label": "Add Tooth To Existng Part Dent"
        },
        "D5660": {
          "key": "D5660",
          "label": "Add Clasp To Existng Part Dent - Per Tooth"
        },
        "D5670": {
          "key": "D5670",
          "label": "Max-Replace All Tth & Acrylic"
        },
        "D5671": {
          "key": "D5671",
          "label": "Mand-Replace All Tth & Acrylic"
        },
        "D5710": {
          "key": "D5710",
          "label": "Rebase Complete Maxil Denture"
        },
        "D5711": {
          "key": "D5711",
          "label": "Rebase Complete Mandib Denture"
        },
        "D5720": {
          "key": "D5720",
          "label": "Rebase Max Partial Denture"
        },
        "D5721": {
          "key": "D5721",
          "label": "Rebase Mand Partial Denture"
        },
        "D5730": {
          "key": "D5730",
          "label": "Reline Complete Max Dent Chair"
        },
        "D5731": {
          "key": "D5731",
          "label": "Reline Complete Man Dent Chair"
        },
        "D5740": {
          "key": "D5740",
          "label": "Reline Max Partial Dent Chair"
        },
        "D5741": {
          "key": "D5741",
          "label": "Reline Mand Partial Dent Chair"
        },
        "D5750": {
          "key": "D5750",
          "label": "Reline Complete Max Dent Lab"
        },
        "D5751": {
          "key": "D5751",
          "label": "Reline Complete Mand Dent Lab"
        },
        "D5760": {
          "key": "D5760",
          "label": "Reline Max Partial Denture Lab"
        },
        "D5761": {
          "key": "D5761",
          "label": "Reline Mand Partial Dent Lab"
        },
        "D5810": {
          "key": "D5810",
          "label": "Interim Complete Dr (Max)"
        },
        "D5811": {
          "key": "D5811",
          "label": "Interim Complete Dr (Mand)"
        },
        "D5820": {
          "key": "D5820",
          "label": "Interim Partial Dr (Max)"
        },
        "D5821": {
          "key": "D5821",
          "label": "Interim Partial Dr (Mand)"
        },
        "D5850": {
          "key": "D5850",
          "label": "Tissue Condtn (Max)"
        },
        "D5851": {
          "key": "D5851",
          "label": "Tissue Condtn (Mand)"
        },
        "D5862": {
          "key": "D5862",
          "label": "Precision Attachment"
        },
        "D5863": {
          "key": "D5863",
          "label": "Overdenture - Complete Maxillary"
        },
        "D5864": {
          "key": "D5864",
          "label": "Overdenture - Partial Maxillary"
        },
        "D5865": {
          "key": "D5865",
          "label": "Overdenture - Complete Mandibular"
        },
        "D5866": {
          "key": "D5866",
          "label": "Overdenture - Partial Mandibular"
        },
        "D5867": {
          "key": "D5867",
          "label": "Repl Of Replcable Part Of Atta"
        },
        "D5875": {
          "key": "D5875",
          "label": "Modified Of Removable Prosthes"
        },
        "D5876": {
          "key": "D5876",
          "label": "Add Metl Substructr To Acrylic Full Dent(per Arch)"
        }
      }
    },
    'D5900-D5999': {
      key: 'D5900-D5999',
      label: 'MAXILLOFACIAL PROSTHETICS',
      breakDownKeys: [
        'D5931',
        'D5932',
        'D5933',
        'D5936'
      ],
      breakDowns: {
        "D5931": {
          "key": "D5931",
          "label": "Obturator prosthesis, surgical"
        },
        "D5932": {
          "key": "D5932",
          "label": "Obturator prosthesis, definitive"
        },
        "D5933": {
          "key": "D5933",
          "label": "Obturator prosthesis, modification"
        },
        "D5936": {
          "key": "D5936",
          "label": "Obturator prosthesis, interim"
        }
      }
    },
    'D6000-D6199': {
      key: 'D6000-D6199',
      label: 'IMPLANTS',
      breakDownKeys: [
        'D6010',
        'D6011',
        'D6012',
        'D6051',
        'D6052',
        'D6055',
        'D6057',
        'D6058',
        'D6059',
        'D6061',
        'D6062',
        'D6064',
        'D6068',
        'D6080',
        'D6082',
        'D6082A',
        'D6083',
        'D6083A',
        'D6084',
        'D6084A',
        'D6086',
        'D6086A',
        'D6087',
        'D6087A',
        'D6088',
        'D6088A',
        'D6091',
        'D6092',
        'D6093',
        'D6095',
        'D6097',
        'D6098',
        'D6099',
        'D6100',
        'D6101',
        'D6102',
        'D6103',
        'D6104',
        'D6110',
        'D6111',
        'D6112',
        'D6113',
        'D6114',
        'D6115',
        'D6116',
        'D6117',
        'D6118',
        'D6119',
        'D6120',
        'D6120A',
        'D6121',
        'D6121A',
        'D6122',
        'D6122A',
        'D6123',
        'D6123A',
        'D6195'
      ],
      breakDowns: {
        "D6010": {
          "key": "D6010",
          "label": "Surgical Placement Implant - Endosteal"
        },
        "D6011": {
          "key": "D6011",
          "label": "Second Stage Implant Surgery"
        },
        "D6012": {
          "key": "D6012",
          "label": "Surg Plcmnt-Interim-Endosteal Implant"
        },
        "D6051": {
          "key": "D6051",
          "label": "Interim Abutment"
        },
        "D6052": {
          "key": "D6052",
          "label": "Semi-Precision Attachment Abutment"
        },
        "D6055": {
          "key": "D6055",
          "label": "Connecting Bar - Implant Or Abutment Supported"
        },
        "D6057": {
          "key": "D6057",
          "label": "Custom Fabricated Abutment"
        },
        "D6058": {
          "key": "D6058",
          "label": "Abutment Supported Porcelain/Ceramic Crown"
        },
        "D6059": {
          "key": "D6059",
          "label": "Abutment Supported Porc Fused To Metal Crown-HNM"
        },
        "D6061": {
          "key": "D6061",
          "label": "Abutment Supported Porc Fused To Metal Crown- NM"
        },
        "D6062": {
          "key": "D6062",
          "label": "Abutment Supported Cast Metal Crown - HNM"
        },
        "D6064": {
          "key": "D6064",
          "label": "Abutment Supported Cast Metal Crown - NM"
        },
        "D6068": {
          "key": "D6068",
          "label": "Abutment Supported Retainer Porcelain/Ceramic FPD"
        },
        "D6080": {
          "key": "D6080",
          "label": "Implant Maintenance Procedures (Removed/Reinserted"
        },
        "D6082": {
          "key": "D6082",
          "label": "Imp Supported Crn- Porcelain Fused To Base Alloys"
        },
        "D6082A": {
          "key": "D6082A",
          "label": "Imp Supported Crn- Porc Fused To Base Alloys"
        },
        "D6083": {
          "key": "D6083",
          "label": "Imp Supported Crn- Porcelain Fused To Noble Alloys"
        },
        "D6083A": {
          "key": "D6083A",
          "label": "Imp Supported Crn- Porc Fused To Noble Alloys"
        },
        "D6084": {
          "key": "D6084",
          "label": "Imp Supported Crn- Porc Fused To Titanium/alloys"
        },
        "D6084A": {
          "key": "D6084A",
          "label": "Imp Supported Crn- Porc Fused To Titanium/alloys"
        },
        "D6086": {
          "key": "D6086",
          "label": "Imp Supported Crn - Predominately Base Alloys"
        },
        "D6086A": {
          "key": "D6086A",
          "label": "Imp Supported Crn- Predominately Base Alloys"
        },
        "D6087": {
          "key": "D6087",
          "label": "Imp Supported Crown - Noble Alloys"
        },
        "D6087A": {
          "key": "D6087A",
          "label": "Imp Supported Crown - Noble Alloys"
        },
        "D6088": {
          "key": "D6088",
          "label": "Imp Supported Crn- Titanium/Titanium Alloys"
        },
        "D6088A": {
          "key": "D6088A",
          "label": "Imp Supported Crn- Titanium/Titanium Alloys"
        },
        "D6091": {
          "key": "D6091",
          "label": "Replcmnt Attchmntt-Imp/Abut Supp Prosth - Per Atta"
        },
        "D6092": {
          "key": "D6092",
          "label": "Recement Or Rebond Implant/Abutment Supported Crwn"
        },
        "D6093": {
          "key": "D6093",
          "label": "Recement Or Rebond Implant/Abutment Supported FPD"
        },
        "D6095": {
          "key": "D6095",
          "label": "Repair Implant Abutment"
        },
        "D6097": {
          "key": "D6097",
          "label": "Abut Supported Crn- Porc Fused To Titanium/alloys"
        },
        "D6098": {
          "key": "D6098",
          "label": "Imp Sup Retainer-Porc Fused To Base Alloys"
        },
        "D6099": {
          "key": "D6099",
          "label": "Imp Sup Retainer FPD- Porc Fused To Noble Alloys"
        },
        "D6100": {
          "key": "D6100",
          "label": "Implant Removal"
        },
        "D6101": {
          "key": "D6101",
          "label": "Debridement Of Periimplant Defect, Clean Exposed"
        },
        "D6102": {
          "key": "D6102",
          "label": "Debridement/Osseous Contour Periimplant Defect"
        },
        "D6103": {
          "key": "D6103",
          "label": "Bone Graft For Repair Of Periimplant Defect"
        },
        "D6104": {
          "key": "D6104",
          "label": "Bone Graft At Time Of Implant Placement"
        },
        "D6110": {
          "key": "D6110",
          "label": "Implant/Abutment Supp Remv Dent - Edentulous Maxil"
        },
        "D6111": {
          "key": "D6111",
          "label": "Implant/Abutment Supp Remv Dent - Edentulous Mand"
        },
        "D6112": {
          "key": "D6112",
          "label": "Implant/Abutment Supp Rmv Dent - Part Edentlus Max"
        },
        "D6113": {
          "key": "D6113",
          "label": "Implant/Abutment Supp Rmv Dent - Part Edentlus Man"
        },
        "D6114": {
          "key": "D6114",
          "label": "Implant/Abutment Supp Fixed Dent - Edentulous Max"
        },
        "D6115": {
          "key": "D6115",
          "label": "Implant/Abutment Supp Fixed Dent - Edentulous Mand"
        },
        "D6116": {
          "key": "D6116",
          "label": "Implant/Abutment Supp Fixd Dent - Part Edentls Max"
        },
        "D6117": {
          "key": "D6117",
          "label": "Implant/Abutment Supp Fixd Dent - Part Edentls Man"
        },
        "D6118": {
          "key": "D6118",
          "label": "Implant/Abutment Supp Interim Fixd Dent-Mandibular"
        },
        "D6119": {
          "key": "D6119",
          "label": "Implant/Abutment Supp Interim Fixd Dent-Maxillary"
        },
        "D6120": {
          "key": "D6120",
          "label": "Imp Sup Retainer - Porc Fused To Titanium/alloys"
        },
        "D6120A": {
          "key": "D6120A",
          "label": "Imp Sup Retainer - Porc Fused To Titanium/alloys"
        },
        "D6121": {
          "key": "D6121",
          "label": "Imp Sup Retainer For Metal FPD- Base Alloys"
        },
        "D6121A": {
          "key": "D6121A",
          "label": "Imp Sup Retainer For Metal FPD - Base Alloys"
        },
        "D6122": {
          "key": "D6122",
          "label": "Imp Sup Retainer For Metal FPD - Noble Alloys"
        },
        "D6122A": {
          "key": "D6122A",
          "label": "Imp Sup Retainer For Metal FPD- Noble Alloys"
        },
        "D6123": {
          "key": "D6123",
          "label": "Imp Sup Retainer For Metal FPD- Titanium/alloys"
        },
        "D6123A": {
          "key": "D6123A",
          "label": "Imp Sup Retainer For Metal FPD- Titanium/alloys"
        },
        "D6195": {
          "key": "D6195",
          "label": "Abut Sup Retainer- Porc Fused To Titanium/alloys"
        }
      }
    },
    'D6200-D6999': {
      key: 'D6200-D6999',
      label: 'PROSTHODONTICS',
      breakDownKeys: [
        'D6240',
        'D6242',
        'D6243',
        'D6243A',
        'D6245',
        'D6545',
        'D6740',
        'D6750',
        'D6752',
        'D6753',
        'D6753A',
        'D6784',
        'D6793',
        'D6920',
        'D6930',
        'D6940',
        'D6950',
        'D6980',
        'D6985',
        'D6999B'
      ],
      breakDowns: {
        "D6240": {
          "key": "D6240",
          "label": "Pontic Porcln Fused Hi Nobl Mt"
        },
        "D6242": {
          "key": "D6242",
          "label": "Pontic Prcln Fused Noble Metal"
        },
        "D6243": {
          "key": "D6243",
          "label": "Pontic - Porc Fused To Titanium/Titanium Alloys"
        },
        "D6243A": {
          "key": "D6243A",
          "label": "Pontic - Porc Fused To Titanium/Titanium Alloys"
        },
        "D6245": {
          "key": "D6245",
          "label": "Pontic Porcelain/Ceramic"
        },
        "D6545": {
          "key": "D6545",
          "label": "Retainer FPD - Cast/Mtl Resin"
        },
        "D6740": {
          "key": "D6740",
          "label": "Retainer Crown - Porcelain/Ceramic"
        },
        "D6750": {
          "key": "D6750",
          "label": "Retainer Crown - Porclain Fused Hi Noble Metal"
        },
        "D6752": {
          "key": "D6752",
          "label": "Retainer Crown - Porclain Fused Noble Metal"
        },
        "D6753": {
          "key": "D6753",
          "label": "Retainer Crown- Porc Fused To Titanium/alloys"
        },
        "D6753A": {
          "key": "D6753A",
          "label": "Retainer Crown- Porc Fused To Titanium/alloys"
        },
        "D6784": {
          "key": "D6784",
          "label": "3/4 Retainer Crown- Titanium/Titanium Alloys"
        },
        "D6793": {
          "key": "D6793",
          "label": "Provisional Retainer Crown - Further TX/Comp Neces"
        },
        "D6920": {
          "key": "D6920",
          "label": "Connector Bar"
        },
        "D6930": {
          "key": "D6930",
          "label": "Recement Or Rebond Fixed Partial Denture"
        },
        "D6940": {
          "key": "D6940",
          "label": "Stress Breaker"
        },
        "D6950": {
          "key": "D6950",
          "label": "Precision Attachment"
        },
        "D6980": {
          "key": "D6980",
          "label": "Fixed Partial Denture Repair - Further TX/Completi"
        },
        "D6985": {
          "key": "D6985",
          "label": "Pediatric Partial Denture Fixd"
        },
        "D6999B": {
          "key": "D6999B",
          "label": "ERA REPLACEMENT"
        }
      }
    },
    'D7000-D7999': {
      key: 'D7000-D7999',
      label: 'ORAL AND MAXILLOFACIAL SURGERY',
      breakDownKeys: [
        'D7111',
        'D7140',
        'D7210',
        'D7220',
        'D7230',
        'D7240',
        'D7241',
        'D7250',
        'D7251',
        'D7260',
        'D7261',
        'D7270',
        'D7272',
        'D7280',
        'D7282',
        'D7283',
        'D7285',
        'D7286',
        'D7310',
        'D7311',
        'D7320',
        'D7321',
        'D7340',
        'D7350',
        'D7472',
        'D7473',
        'D7510',
        'D7511',
        'D7922',
        'D7951',
        'D7952',
        'D7953',
        'D7960',
        'D7963'
      ],
      breakDowns: {
        "D7111": {
          "key": "D7111",
          "label": "Extraction, Coronal Remnants - Primary Tooth"
        },
        "D7140": {
          "key": "D7140",
          "label": "Extract Erpted Th/Expsed Root"
        },
        "D7210": {
          "key": "D7210",
          "label": "Extraction, Erupted Tooth Require Removal/Sectioni"
        },
        "D7220": {
          "key": "D7220",
          "label": "Remov Impacted Tooth Soft Tiss"
        },
        "D7230": {
          "key": "D7230",
          "label": "Remov Impacted Th Partial Bony"
        },
        "D7240": {
          "key": "D7240",
          "label": "Remov Impacted Th Complet Bony"
        },
        "D7241": {
          "key": "D7241",
          "label": "Remov Impt Th Cmp Bny W/Compli"
        },
        "D7250": {
          "key": "D7250",
          "label": "Removal Of Residual Tooth Roots(Cutting Procedure)"
        },
        "D7251": {
          "key": "D7251",
          "label": "Coronectomy - Intentional Partial Tooth Removal"
        },
        "D7260": {
          "key": "D7260",
          "label": "Oroantral Fistula Closure"
        },
        "D7261": {
          "key": "D7261",
          "label": "Prim Closure Sinus Perforation"
        },
        "D7270": {
          "key": "D7270",
          "label": "Tooth Reimplant/Stabilization"
        },
        "D7272": {
          "key": "D7272",
          "label": "Tooth Transplantation"
        },
        "D7280": {
          "key": "D7280",
          "label": "Exposure Of An Unerupted Tooth"
        },
        "D7282": {
          "key": "D7282",
          "label": "Mobilization Of Erupted Tooth"
        },
        "D7283": {
          "key": "D7283",
          "label": "Place Device For Eruption For Impacted Tooth"
        },
        "D7285": {
          "key": "D7285",
          "label": "Incisional Biopsy Of Oral Tissue - Hard(Bone/tooth"
        },
        "D7286": {
          "key": "D7286",
          "label": "Incisional Biopsy Of Oral Tissue - Soft"
        },
        "D7310": {
          "key": "D7310",
          "label": "Alveo W Extractions 4+Th/Per Quad"
        },
        "D7311": {
          "key": "D7311",
          "label": "Alveoplasty W/ Extraction - 1-3Tth/Quad"
        },
        "D7320": {
          "key": "D7320",
          "label": "Alveo W/O Extractions 4+Th/Per Quad"
        },
        "D7321": {
          "key": "D7321",
          "label": "Alveoplasty W/O Extraction - 1-3Tth/Quad"
        },
        "D7340": {
          "key": "D7340",
          "label": "Vistibuolplasty Simple"
        },
        "D7350": {
          "key": "D7350",
          "label": "Vestibuloplasty Complete"
        },
        "D7472": {
          "key": "D7472",
          "label": "Removal Of Torus Palatinus"
        },
        "D7473": {
          "key": "D7473",
          "label": "Removal Of Torus Mandibularis"
        },
        "D7510": {
          "key": "D7510",
          "label": "I&D Of Abscess - Intraoral Soft"
        },
        "D7511": {
          "key": "D7511",
          "label": "I&D Of Abscess - Intraoral Soft, Complicated"
        },
        "D7922": {
          "key": "D7922",
          "label": "Intra-socket Bio Dressing For Hemostasis, Per Site"
        },
        "D7951": {
          "key": "D7951",
          "label": "Sinus Augmentation Via A Lateral Open Approach"
        },
        "D7952": {
          "key": "D7952",
          "label": "Sinus Augmentation Via A Vertical Approach"
        },
        "D7953": {
          "key": "D7953",
          "label": "Bone Rplcmnt Graft For Ridge Pres - Per Site"
        },
        "D7960": {
          "key": "D7960",
          "label": "Frenulectomy / Frenectomy / Frenotomy"
        },
        "D7963": {
          "key": "D7963",
          "label": "Frenuloplasty"
        }
      }
    },
    'D8000-D8999': {
      key: 'D8000-D8999',
      label: 'ORTHODONTICS',
      breakDownKeys: [
        'D8696',
        'D8697',
        'D8698',
        'D8699',
        'D8701',
        'D8702',
        'D8703',
        'D8704'
      ],
      breakDowns: {
        "D8696": {
          "key": "D8696",
          "label": "Repair Of Ortho Appliance - Maxillary"
        },
        "D8697": {
          "key": "D8697",
          "label": "Repair Of Ortho Appliance - Mandibular"
        },
        "D8698": {
          "key": "D8698",
          "label": "Re-Cement/Re-Bond Fixed Retainer - Maxillary"
        },
        "D8699": {
          "key": "D8699",
          "label": "Re-Cement/Re-Bond Fixed Retainer - Mandibular"
        },
        "D8701": {
          "key": "D8701",
          "label": "Repair Fixed Retainer, Includes Reattachment- Max"
        },
        "D8702": {
          "key": "D8702",
          "label": "Repair Fixed Retainer, Includes Reattachment- Mand"
        },
        "D8703": {
          "key": "D8703",
          "label": "Replace Lost/broken Retainer - Max"
        },
        "D8704": {
          "key": "D8704",
          "label": "Replace Lost/Broken Retainer - Mand"
        }
      }
    },
    'D9000-D10000': {
      key: 'D9000-D10000',
      label: 'ADJUNCTIVE GENERAL SERVICES',
      breakDownKeys: [
        'D9110',
        'D9120',
        'D9230',
        'D9310',
        'D9430',
        'D9440',
        'D9630',
        'D9910',
        'D9911',
        'D9930',
        'D9931',
        'D9932',
        'D9933',
        'D9934',
        'D9935',
        'D9943',
        'D9944',
        'D9945',
        'D9946',
        'D9951',
        'D9952',
        'D9961',
        'D9970',
        'D9971',
        'D9972',
        'D9975',
        'D9986',
        'D9987',
        'D9994',
        'D9995',
        'D9996',
        'D9997',
        'D9999',
        'D9999A'
      ],
      breakDowns: {
        "D9110": {
          "key": "D9110",
          "label": "Emergency Treatment/Palliative"
        },
        "D9120": {
          "key": "D9120",
          "label": "Fixed Partial Denture Sectioning"
        },
        "D9230": {
          "key": "D9230",
          "label": "Inhalation Of Nitrous Oxide (Anxiolysis, Analgesia"
        },
        "D9310": {
          "key": "D9310",
          "label": "Consultation - Diag Srvc Other Than Reqstg Prvdr"
        },
        "D9430": {
          "key": "D9430",
          "label": "Office Visit For Observation"
        },
        "D9440": {
          "key": "D9440",
          "label": "Office Visit After Hours"
        },
        "D9630": {
          "key": "D9630",
          "label": "Drugs/Medicaments Dispensed In Office For Home Use"
        },
        "D9910": {
          "key": "D9910",
          "label": "Application Of Desensitizing"
        },
        "D9911": {
          "key": "D9911",
          "label": "Apply Desensitizing Resin"
        },
        "D9930": {
          "key": "D9930",
          "label": "Treatment Of Complications"
        },
        "D9931": {
          "key": "D9931",
          "label": "Cleaning And Inspection Of A Removable Appliance"
        },
        "D9932": {
          "key": "D9932",
          "label": "Cleaning/Inspection Removable Compl Dent, Maxilla"
        },
        "D9933": {
          "key": "D9933",
          "label": "Cleaning/Inspection Removable Compl Dent, Mandibul"
        },
        "D9934": {
          "key": "D9934",
          "label": "Cleaning/Inspection Removable Partial Dent, Maxill"
        },
        "D9935": {
          "key": "D9935",
          "label": "Cleaning/Inspection Removable Partial Dent, Mandib"
        },
        "D9943": {
          "key": "D9943",
          "label": "Occlusal Guard Adjustment"
        },
        "D9944": {
          "key": "D9944",
          "label": "Occlusal Guard - Hard Appliance, Full Arch"
        },
        "D9945": {
          "key": "D9945",
          "label": "Occlusal Guard - Soft Appliance, Full Arch"
        },
        "D9946": {
          "key": "D9946",
          "label": "Occlusal Guard - Hard Appliance, Partial Arch"
        },
        "D9951": {
          "key": "D9951",
          "label": "Occlusal Adjustment Limited"
        },
        "D9952": {
          "key": "D9952",
          "label": "Occlusal Adjustment Complete"
        },
        "D9961": {
          "key": "D9961",
          "label": "Duplicate/Copy Patient's Records"
        },
        "D9970": {
          "key": "D9970",
          "label": "Enamel Microabrasion"
        },
        "D9971": {
          "key": "D9971",
          "label": "Odontoplasty 1-2 Teeth"
        },
        "D9972": {
          "key": "D9972",
          "label": "External Bleaching(ZOOM)Per Arch, In Office"
        },
        "D9975": {
          "key": "D9975",
          "label": "External Bleaching Home Application, Per Arch"
        },
        "D9986": {
          "key": "D9986",
          "label": "Missed Appointment"
        },
        "D9987": {
          "key": "D9987",
          "label": "Cancelled Appointment"
        },
        "D9994": {
          "key": "D9994",
          "label": "Dental Case Mgmt - Pt Education For OH Literacy"
        },
        "D9995": {
          "key": "D9995",
          "label": "Teledentistry Synchronous; Real Time Encounter"
        },
        "D9996": {
          "key": "D9996",
          "label": "Teledentistry Asynchronous; Subsequent Review"
        },
        "D9997": {
          "key": "D9997",
          "label": "Dental Case Mgmt- Pts W/special Health Care Needs"
        },
        "D9999": {
          "key": "D9999",
          "label": "Unspecified Adjunctive Procedure"
        },
        "D9999A": {
          "key": "D9999A",
          "label": "QuickSplint"
        }
      }
    }
  }
};

export interface InsuranceGroup {
  category: string;
  componentKeys: string[];
  components: InsuranceMap;
}

export interface InsuranceMap {
  [key: string]: InsuranceComponent;
}

export interface InsuranceComponent {
  key: string;
  label: string;
  required: boolean;
  type: string; // This is the type of component to use, text, number, file, etc.
  value: any;
}

export function generateGroups(): InsuranceGroup[] {
  return [
    {
      category: 'General Information',
      componentKeys: [
        'status',
        'patientName',
        'patientDob',
        'subscriberName',
        'subscriberDob',
        'subscriberId',
        'insuranceName',
        'insuranceMailingAddress',
        'payerId',
        'groupNumber',
        'annualMaximum',
        'maximumUsed',
        'deductibleInd',
        'deductibleMetAmtInd',
        'deductibleFamily',
        'deductibleMetAmtFamily',
        'missingToothClause',
        'waitingPeriods',
        'calendarOrBenefitYear',
        'inNetwork',
        'preventiveDeductedFromMaximum',
        'feeSchedule'
      ],
      components: generateGeneralInformation()
    },
    {
      category: 'Categories (can add one % or a range)',
      componentKeys: [
        '01001999',
        '20002699',
        '27002899',
        '29002999',
        '30003999',
        '40004999',
        '50005899',
        '59005999',
        '60006199',
        '62006999',
        '70007999',
        '80008999',
        '90009999'
      ],
      components: generateCategories()
    },
    {
      category: 'History',
      componentKeys: [
        'periodicExam',
        'compExam',
        'fmxPano',
        'bwx',
        'prophy',
        'sealants',
        'sdf',
        'perioMaint',
        'srp',
        'crowns',
        'restorations'
      ],
      components: generateHistory()
    }
  ];
}

export function generateGeneralInformation(): InsuranceMap {
  return {
    status: {
      key: '',
      label: 'Status',
      required: true,
      type: '',
      value: '',
    },
    patientName: {
      key: '',
      label: 'Patient Name',
      required: true,
      type: '',
      value: '',
    },
    patientDob: {
      key: '',
      label: 'Patient Birtdhay',
      required: true,
      type: '',
      value: '',
    },
    subscriberName: {
      key: '',
      label: 'Subscriber Name',
      required: true,
      type: '',
      value: '',
    },
    subscriberDob: {
      key: '',
      label: 'Subscriber Birthday',
      required: true,
      type: '',
      value: '',
    },
    subscriberId: {
      key: '',
      label: 'Subscriber Id',
      required: true,
      type: '',
      value: '',
    },
    insuranceName: {
      key: '',
      label: 'Insurance Name',
      required: true,
      type: '',
      value: '',
    },
    insuranceMailingAddress: {
      key: '',
      label: 'Insurance Mailing Address',
      required: true,
      type: '',
      value: '',
    },
    payerId: {
      key: '',
      label: 'Payer Id',
      required: true,
      type: '',
      value: '',
    },
    groupNameNumber: {
      key: '',
      label: 'Group Name',
      required: true,
      type: '',
      value: '',
    },
    groupNumber: {
      key: '',
      label: 'Group Number',
      required: true,
      type: '',
      value: '',
    },
    annualMaximum: {
      key: '',
      label: 'Annual Maximum',
      required: true,
      type: '',
      value: '',
    },
    maximumUsed: {
      key: '',
      label: 'Maximum Used',
      required: true,
      type: '',
      value: '',
    },
    deductibleInd: {
      key: '',
      label: 'Deductible (In Network)',
      required: true,
      type: '',
      value: '',
    },
    deductibleMetAmtInd: {
      key: '',
      label: 'Deductible Met Amount (In Network)',
      required: true,
      type: '',
      value: '',
    },
    deductibleFamily: {
      key: '',
      label: 'Deductible (Family)',
      required: true,
      type: '',
      value: '',
    },
    deductibleMetAmtFamily: {
      key: '',
      label: 'Deductible Met Amount (Family)',
      required: true,
      type: '',
      value: '',
    },
    missingToothClause: {
      key: '',
      label: 'Missing Tooth Clause',
      required: true,
      type: '',
      value: '',
    },
    waitingPeriods: {
      key: '',
      label: 'Waiting Periods',
      required: true,
      type: '',
      value: '',
    },
    calendarOrBenefitYear: {
      key: '',
      label: 'Calendar or Benefit Year',
      required: true,
      type: '',
      value: '',
    },
    inNetwork: {
      key: '',
      label: 'In Network',
      required: true,
      type: '',
      value: '',
    },
    preventiveDeductedFromMaximum: {
      key: '',
      label: 'Preventative Deducted from Maximum',
      required: true,
      type: '',
      value: '',
    },
    feeSchedule: {
      key: '',
      label: 'Fee Schedule',
      required: true,
      type: '',
      value: '',
    }
  };
}

export function generateCategories(): InsuranceMap {
  return {
    '01001999': {
      key: '',
      label: '0100-1999 Diag/Preventative',
      required: true,
      type: '',
      value: '',
    },
    20002699: {
      key: '',
      label: '2000-2699 Basic Restorative',
      required: true,
      type: '',
      value: '',
    },
    27002899: {
      key: '',
      label: '2700-2899 Crowns',
      required: true,
      type: '',
      value: '',
    },
    29002999: {
      key: '',
      label: '2900-2999 Other Restorative',
      required: true,
      type: '',
      value: '',
    },
    30003999: {
      key: '',
      label: '3000-3999 Endodontics',
      required: true,
      type: '',
      value: '',
    },
    40004999: {
      key: '',
      label: '4000-4999 Periodontics',
      required: true,
      type: '',
      value: '',
    },
    50005899: {
      key: '',
      label: '5000-5899 Prosthodontics, Removable',
      required: true,
      type: '',
      value: '',
    },
    59005999: {
      key: '',
      label: '5900-5999 Prosthodontics, Maxillofacial',
      required: true,
      type: '',
      value: '',
    },
    60006199: {
      key: '',
      label: '6000-6199 Implants',
      required: true,
      type: '',
      value: '',
    },
    62006999: {
      key: '',
      label: '6200-6999 Prosthodontics, Fixed',
      required: true,
      type: '',
      value: '',
    },
    70007999: {
      key: '',
      label: '7000-7999 Oral Surgery',
      required: true,
      type: '',
      value: '',
    },
    80008999: {
      key: '',
      label: '8000-8999 Orthodontics',
      required: true,
      type: '',
      value: '',
    },
    90009999: {
      key: '',
      label: '9000-9999 Adj General Services',
      required: true,
      type: '',
      value: '',
    }
  };
}

export function generateHistory(): InsuranceMap {
  return {
    periodicExam: {
      key: '',
      label: 'Periodic Exam',
      required: true,
      type: '',
      value: '',
    },
    compExam: {
      key: '',
      label: 'Comp Exam',
      required: true,
      type: '',
      value: '',
    },
    fmxPano: {
      key: '',
      label: 'FMX / Pano',
      required: true,
      type: '',
      value: '',
    },
    bwx: {
      key: '',
      label: 'BWX',
      required: true,
      type: '',
      value: '',
    },
    prophy: {
      key: '',
      label: 'Adult Prophy / Child Prophy',
      required: true,
      type: '',
      value: '',
    },
    sealants: {
      key: '',
      label: 'Sealants #2, 3, 14, 15, 18, 19, 30, 31',
      required: true,
      type: '',
      value: '',
    },
    sdf: {
      key: '',
      label: 'SDF',
      required: true,
      type: '',
      value: '',
    },
    perioMaint: {
      key: '',
      label: 'Perio Maint',
      required: true,
      type: '',
      value: '',
    },
    srp: {
      key: '',
      label: 'SRP',
      required: true,
      type: '',
      value: '',
    },
    crowns: {
      key: '',
      label: 'Crowns',
      required: true,
      type: '',
      value: '',
    },
    restorations: {
      key: '',
      label: 'Restorations',
      required: true,
      type: '',
      value: '',
    },
  };
}
