from packaging import version
def compare_version(ver1,ver2):
    actual_ver1 = version.parse(ver1)
    actual_ver2 = version.parse(ver2)
    if actual_ver1 > actual_ver2:
        return 1
    elif actual_ver1 < actual_ver2:
        return -1
    else:
        return 0

