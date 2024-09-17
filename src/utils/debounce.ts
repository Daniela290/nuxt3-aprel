export function debounce(callee: Function, timeoutMs: number) {
    let _timeoutId: any = null;

    return function (...args: any) {
        clearTimeout(_timeoutId)

        _timeoutId = setTimeout(function () {
            callee(...args)
        }, timeoutMs)
    }
}


