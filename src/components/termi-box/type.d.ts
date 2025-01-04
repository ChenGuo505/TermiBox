declare namespace TermiBox {
  interface Terminal {
    clear: () => void
    outputResult: (outputComponent: object, props?: object) => void // Output result component
    outputInfoText: (text: string) => void // Output text with info status
    outputSuccessText: (text: string) => void // Output text with success status
    outputWarningText: (text: string) => void // Output text with warning status
    outputErrorText: (text: string) => void // Output text with error status
    outputSystemText: (text: string) => void // Output text with system status
  }

  type OutputStatus = 'success' | 'error'

  interface OutputContent {
    status?: OutputStatus
    text?: string
    logText?: LogText[]
    component?: object
    props?: object
  }

  type LogStatus = 'info' | 'success' | 'warning' | 'error' | 'system'

  interface LogText {
    status: LogStatus
    text: string
  }
}
