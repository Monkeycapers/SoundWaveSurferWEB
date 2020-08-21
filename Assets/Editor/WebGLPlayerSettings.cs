using UnityEditor;

[InitializeOnLoad]
public class WebGLPlayerSettings
{
    static WebGLPlayerSettings()
    {
        PlayerSettings.WebGL.linkerTarget = WebGLLinkerTarget.Wasm;
        PlayerSettings.WebGL.threadsSupport = true;
        PlayerSettings.WebGL.memorySize = 512;
        PlayerSettings.SetPropertyString("emscriptenArgs", "-s ALLOW_MEMORY_GROWTH=1", BuildTargetGroup.WebGL);

    }
}

