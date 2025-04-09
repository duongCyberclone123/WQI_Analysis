using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StoneDot : MonoBehaviour
{
    [SerializeField] private Sprite vil;
    [SerializeField] private Sprite op;
    
    public Sprite getVil()
    {
        return vil;
    }
    public Sprite getOp()
    {
        return op;
    }

    public void setVil(Sprite vil)
    {
        this.vil = vil;
    }
    public void setOp(Sprite op)
    {
        this.op = op;
    }

}
