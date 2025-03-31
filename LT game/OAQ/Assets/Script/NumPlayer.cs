using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NumPlayer : MonoBehaviour
{
    public int num;
    private void Awake()
    {
        DontDestroyOnLoad(this);
    }
}
