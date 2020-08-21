using UnityEngine;

[System.Serializable]
public class WebInfo
{
    public float[] samples;

    public static WebInfo CreateFromJSON(string json)
    {
        return JsonUtility.FromJson<WebInfo>(json);
    }
}