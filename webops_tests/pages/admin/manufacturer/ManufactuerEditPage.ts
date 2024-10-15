import { Page } from '@playwright/test';
import { BasePage } from '../../../pages/BasePage';

export class ManufacturerEditPage extends BasePage {
    readonly manufacturerNameInput = '//label[contains(text(), "Manufacturer Name")]/following-sibling::input[@name="name"]';
    readonly manufacturerCaseIdInput = 'input[name="caseIdName"][type="text"]';
    readonly manufacturerErpCodeInput = 'input[name="erpCode"].form-control';
   
   
   //Main Accordions
    private manufacturerProfileAccordion = 'text=Manufacturer Profile';
    private localizationAccordion = 'text=Localization';
    private settingsInfoAccordion = 'text=Settings Info';
    private securityOptionAccordion = 'text=Security Option';
    private transferAccordion = 'text=Transfer';
    private manufacturerPreferenceAccordion = 'text=Manufacturer Preference';
    private barcodeSettingsAccordion = 'text=Barcode Settings';
    private mobileAppBatchSizesAccordion = 'text=Mobile App Batch Sizes';

    //Main Buttons
    private saveButton = 'button.btn-primary[value="save"]';
    private cancelButton = 'button[value="cancel"]';

    //Manufacturer Profile options
    private accessToReplenishmentCheckbox = 'text=Access to Replenishment Shipping Methods - Manufacturer Admin Only >> input[type="checkbox"]';
    private shipMethodAtItemLevelCheckbox = 'text=Ship Method at Item Level >> input[type="checkbox"]';
    private caseIdentifierRequirementCheckbox = 'text=Case Identifier Requirement >> input[type="checkbox"]';
    private manufacturerCaseIdRequiredCheckbox = 'text=Manufacturer Case ID Required >> input[type="checkbox"]';
    private revisionInformationCheckbox = 'text=Revision Information >> input[type="checkbox"]';
    private revisionInformationRequiredCheckbox = 'text=Revision Information Required >> input[type="checkbox"]';
    private revisionInformationWarningMessageCheckbox = 'text=Revision Information Warning Message >> input[type="checkbox"]';
    private revisionInformationWarningMessageText = 'text=Revision Information Warning Message Text >> textarea';
    private logoUploadInput = 'text=Logo >> input[type="file"]';
    private activationDateInputs = 'text=Activation Date >> input[type="text"]';

    //Setting Info Options

    private noLotCodeValueInput = 'text=No Lot Code Value >> input';
    private arriveDaysPriorInput = 'text=Arrive By Days Prior To Surgery Date >> input';
    private AllowTempKitsFromLoanerBankCheckbox = 'text=Allow Loaner Bank Alternatives >> input[type="checkbox"]';
    private allowQuantityReceivingCheckbox = 'text=Allow Quantity Receiving for Lot Controlled Items >> input[type="checkbox"]';
    private allowTempKitsCheckbox = 'text=Allow temp kits from loaner banks >> input[type="checkbox"]';
    private allowRestockAtKitCheckInCheckbox = 'text=Allow Restock at Kit Check In >> input[type="checkbox"]';
    private allowScanQuantityForKitEditCheckbox = 'text=Allow Scan Quantity for Kit Edit - Items >> input[type="checkbox"]';
    private binLocationFormatRadio15Char = 'text=15-character max. No separators required. >> input[type="radio"]';
    private binLocationFormatRadio4Levels = 'text=Four levels. Three characters each. Dot or dash separators. >> input[type="radio"]';

    //Securiry Options
    private maxFailedLoginAttemptsInput = 'text=Maximum Failed Login Attempts >> input[type="number"]';
    private strongPasswordCheckbox = 'text=Strong Password >> input[type="checkbox"]';

    //Tranfer Options
    private interBranchTransferSelect = 'text=Inter Branch Item Transfer >> select';
    private prefixInterBranchTransferKitsCheckbox = 'text=Prefix Inter Branch Transfer Kits as New >> input[type="checkbox"]';
    private manufacturerReturnSelect = 'text=Manufacturer Return >> select';
    private autoGenerateReturnNotificationCheckbox = 'text=Auto Generate Return Notification Authorization Number >> input[type="checkbox"]';
    private alwaysRequireReceiptOfReturnsCheckbox = 'text=Always Require Receipt of Returns >> input[type="checkbox"]';


//Manufactures Preferences Options

//BarCode Settings

    private serialNumberAsLotCodeCheckbox = 'text=Serial Number as Lot Code >> input[type="checkbox"]';
    private gs1AisSelect = 'text=GS1 AIs >> select';
//Mobile App Batch size options

    private hospitalPricesInput = 'text=Hospital Prices >> input[type="number"]';
    private masterPartsFileInput = 'text=Master Parts File >> input[type="number"]';
    private parSettingsInput = 'text=Par Settings >> input[type="number"]';
    private inventoryCountInput = 'text=Inventory Count >> input[type="number"]';

    constructor(page: Page) {
        super(page);
    }


//Main input methods

    async setManufacturerName(name: string): Promise<void> {
        await this.fillInput(this.manufacturerNameInput, name);
    }

    async setManufacturerCaseId(caseId: string): Promise<void> {
        await this.fillInput(this.manufacturerCaseIdInput, caseId);
    }

    async setManufacturerErpCode(erpCode: string): Promise<void> {
        await this.fillInput(this.manufacturerErpCodeInput, erpCode);
    }



//Main Accordions Methods
    

    async expandManufacturerProfileAccordion(): Promise<void> {
        await this.clickElement(this.manufacturerProfileAccordion);
    }

    async expandLocalizationAccordion(): Promise<void> {
        await this.clickElement(this.localizationAccordion);
    }

    async expandSettingsInfoAccordion(): Promise<void> {
        await this.clickElement(this.settingsInfoAccordion);
    }

    async expandSecurityOptionAccordion(): Promise<void> {
        await this.clickElement(this.securityOptionAccordion);
    }

    async expandTransferAccordion(): Promise<void> {
        await this.clickElement(this.transferAccordion);
    }

    async expandManufacturerPreferenceAccordion(): Promise<void> {
        await this.clickElement(this.manufacturerPreferenceAccordion);
    }

    async expandBarcodeSettingsAccordion(): Promise<void> {
        await this.clickElement(this.barcodeSettingsAccordion);
    }

    async expandMobileAppBatchSizesAccordion(): Promise<void> {
        await this.clickElement(this.mobileAppBatchSizesAccordion);
    }

//Main buttons  methods 

    async clickSave(): Promise<void> {
        await this.clickElement(this.saveButton);
    }

    async clickCancel(): Promise<void> {
        await this.clickElement(this.cancelButton);
    }

//Checkbox methods located inside the Manufacturer Profile Accordion


    async checkAccessToReplenishment(): Promise<void> {
        await this.clickElement(this.accessToReplenishmentCheckbox);
    }

    async checkShipMethodAtItemLevel(): Promise<void> {
        await this.clickElement(this.shipMethodAtItemLevelCheckbox);
    }

    async checkCaseIdentifierRequirement(): Promise<void> {
        await this.clickElement(this.caseIdentifierRequirementCheckbox);
    }

    async checkManufacturerCaseIdRequired(): Promise<void> {
        await this.clickElement(this.manufacturerCaseIdRequiredCheckbox);
    }

    async checkRevisionInformation(): Promise<void> {
        await this.clickElement(this.revisionInformationCheckbox);
    }

    async checkRevisionInformationRequired(): Promise<void> {
        await this.clickElement(this.revisionInformationRequiredCheckbox);
    }

    async checkRevisionInformationWarningMessage(): Promise<void> {
        await this.clickElement(this.revisionInformationWarningMessageCheckbox);
    }

    async setRevisionInformationWarningMessageText(text: string): Promise<void> {
        await this.fillInput(this.revisionInformationWarningMessageText, text);
    }


    async uploadLogo(filePath: string): Promise<void> {
        await this.handleAction(
            () => this.page.setInputFiles(this.logoUploadInput, filePath),
            `Uploaded logo file: ${filePath}`,
            `Failed to upload logo file: ${filePath}`
        );
    }

    async setActivationDates(dates: string[]): Promise<void> {
        const dateInputs = await this.page.$$(this.activationDateInputs);
        for (let i = 0; i < dateInputs.length && i < dates.length; i++) {
            await this.handleAction(
                () => dateInputs[i].fill(dates[i]),
                `Set activation date ${i + 1} to ${dates[i]}`,
                `Failed to set activation date ${i + 1} to ${dates[i]}`
            );
        }
    }


//Methods inside  the  Set info Accordion

    async setNoLotCodeValue(value: string): Promise<void> {
        await this.fillInput(this.noLotCodeValueInput, value);
    }

    async setArriveDaysPrior(days: number): Promise<void> {
        await this.fillInput(this.arriveDaysPriorInput, days.toString());
    }

    async checkAllowRestockAtKitCheckIn(): Promise<void> {
        await this.clickElement(this.allowRestockAtKitCheckInCheckbox);
    }

//Checkboxesinside  the  Set info Accordion

async checkAllowQuantityReceiving(): Promise<void> {
    await this.clickElement(this.allowQuantityReceivingCheckbox);
}


async selectBinLocationFormat15Char(): Promise<void> {
    await this.clickElement(this.binLocationFormatRadio15Char);
}

async selectBinLocationFormat4Levels(): Promise<void> {
    await this.clickElement(this.binLocationFormatRadio4Levels);
}


    async checkAllowTempKitsFromLoanerBank(): Promise<void> {
        await this.clickElement(this.AllowTempKitsFromLoanerBankCheckbox);

    }
   
 
    async checkAllowScanQuantityForKitEdit(): Promise<void> {
        await this.clickElement(this.allowScanQuantityForKitEditCheckbox);
    }

//Methods inside the  Security Accordion

    async setMaxFailedLoginAttempts(attempts: number): Promise<void> {
        await this.fillInput(this.maxFailedLoginAttemptsInput, attempts.toString());
    }

    async checkStrongPassword(): Promise<void> {
        await this.clickElement(this.strongPasswordCheckbox);
    }

//Methods inside the Tranfer Accordion


    async selectInterBranchTransferOption(option: string): Promise<void> {
        await this.selectOption(this.interBranchTransferSelect, option);
    }

  
    async selectManufacturerReturnOption(option: string): Promise<void> {
        await this.selectOption(this.manufacturerReturnSelect, option);
    }

    async checkPrefixInterBranchTransferKits(): Promise<void> {
        await this.clickElement(this.prefixInterBranchTransferKitsCheckbox);
    }

//checkboxes inside the Tranfer Accordion
    async checkAutoGenerateReturnNotification(): Promise<void> {
        await this.clickElement(this.autoGenerateReturnNotificationCheckbox);
    }

    async checkAlwaysRequireReceiptOfReturns(): Promise<void> {
        await this.clickElement(this.alwaysRequireReceiptOfReturnsCheckbox);
    }

    async checkSerialNumberAsLotCode(): Promise<void> {
        await this.clickElement(this.serialNumberAsLotCodeCheckbox);
    }

//Methods inside the Barcode Settings



    async selectGs1Ais(option: string): Promise<void> {
        await this.selectOption(this.gs1AisSelect, option);
    }

//Methods inside the Mobile App Batch Sizes

    async setHospitalPrices(value: number): Promise<void> {
        await this.fillInput(this.hospitalPricesInput, value.toString());
    }

    async setMasterPartsFile(value: number): Promise<void> {
        await this.fillInput(this.masterPartsFileInput, value.toString());
    }

    async setParSettings(value: number): Promise<void> {
        await this.fillInput(this.parSettingsInput, value.toString());
    }

    async setInventoryCount(value: number): Promise<void> {
        await this.fillInput(this.inventoryCountInput, value.toString());
    }


   
}