interface Window {
  _hmt: {
    push: (
      data: [type: '_trackEvent', category?: string, action?: string, opt_label?: string, opt_value?: string],
    ) => void
  }
}
